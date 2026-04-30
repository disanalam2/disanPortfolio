import React, { useState, useEffect } from 'react';
import '../styles/experience.scss';
import { motion } from 'framer-motion';

const Experience = ({ isAdmin }) => {
  const [experienceData, setExperienceData] = useState([]);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingExpId, setEditingExpId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // ================= DATABASE SE FETCH KARNA =================
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/experience');
        if (response.ok) {
          const data = await response.json();
          setExperienceData(data);
          setTempData(data);
        }
      } catch (error) {
        console.error("Database se experience laane me error:", error);
      }
    };
    fetchExperience();
  }, []);

  // ================= PAGE LEVEL HANDLERS =================
  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(experienceData)));
    setIsEditingPage(true);
  };

  const handleSavePage = () => {
    setExperienceData(tempData);
    setIsEditingPage(false);
    setEditingExpId(null);
  };

  const handleCancelPage = () => {
    setTempData([...experienceData]);
    setIsEditingPage(false);
    setEditingExpId(null);
  };

  // ================= ADD NAYA EXPERIENCE =================
  const handleAddExperience = async () => {
    const newExpTemplate = {
      role: 'New Role Title',
      company: 'Company Name',
      period: 'Month Year - Month Year',
      details: ['Write your first point here...', 'Write your second point here...']
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/experience/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newExpTemplate)
      });
      const data = await response.json();

      if (data.success) {
        const newExp = { ...newExpTemplate, id: data.insertId };
        setTempData([newExp, ...tempData]);
        setExperienceData([newExp, ...experienceData]);
      }
    } catch (error) {
      console.error("Experience add karne me error:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  // ================= DELETE EXPERIENCE =================
  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/experience/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // <-- NAYA HEADER ADD KIYA
          }
        });
        const data = await response.json();

        if (data.success) {
          setTempData(tempData.filter(exp => exp.id !== id));
          setExperienceData(experienceData.filter(exp => exp.id !== id));
        }
      } catch (error) {
        console.error("Delete karne me error:", error);
      }
    }
  };

  // ================= CARD EDIT HANDLERS =================
  const startEditingExperience = (exp) => {
    setEditingExpId(exp.id);
    // Array ko String (Enter/Newline se separated) me badal rahe hain textarea ke liye
    setEditFormData({ ...exp, detailsStr: exp.details ? exp.details.join('\n') : '' });
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // ================= UPDATE EXPERIENCE =================
  const saveExperienceDetails = async (id) => {
    // Textarea string ko wapas Array (bullet points) me badalna
    const detailsArray = editFormData.detailsStr.split('\n').filter(point => point.trim() !== '');

    const updatedExpData = {
      ...editFormData,
      details: detailsArray
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/experience/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updatedExpData)
      });

      const data = await response.json();
      if (data.success) {
        const finalData = tempData.map(exp => exp.id === id ? updatedExpData : exp);
        setTempData(finalData);
        setExperienceData(finalData);
        setEditingExpId(null);
        alert("Experience updated safely!");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error saving experience details!");
    }
  };

  const displayData = isEditingPage ? tempData : experienceData;

  return (
    <>
      <motion.section
        className="experience-section container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2>Experience</h2>
          <p>Roles, projects, and hands-on work that demonstrate how I build real products.</p>
        </div>

        {displayData.length === 0 && !isEditingPage && (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>No experience added yet.</p>
        )}

        <div className="timeline">
          {displayData.map((item, index) => (
            <motion.article
              className="timeline-card"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.4 }}
            >

              {/* ================= EDIT FORM VIEW ================= */}
              {editingExpId === item.id ? (
                <div className="exp-edit-form">
                  <input type="text" name="role" value={editFormData.role} onChange={handleFormChange} placeholder="Job Role (e.g. Web Developer)" className="edit-input bold" />
                  <input type="text" name="company" value={editFormData.company} onChange={handleFormChange} placeholder="Company / Organization Name" className="edit-input company-input" />
                  <input type="text" name="period" value={editFormData.period} onChange={handleFormChange} placeholder="Duration (e.g. Jan 2025 - Present)" className="edit-input" />

                  <label className="input-label">Details (Har naya point nayi line me likhein):</label>
                  <textarea name="detailsStr" value={editFormData.detailsStr} onChange={handleFormChange} placeholder="Did this...\nDid that..." className="edit-input desc" rows="5" />

                  <div className="card-edit-actions">
                    <button onClick={() => saveExperienceDetails(item.id)} className="btn save-btn">Save Done</button>
                    <button onClick={() => setEditingExpId(null)} className="btn cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (

                /* ================= NORMAL VIEW ================= */
                <>
                  {isEditingPage && (
                    <div className="card-admin-bar">
                      <div className="action-icons">
                        <button onClick={() => startEditingExperience(item)} className="edit-icon">✏️ Edit</button>
                        <button onClick={() => handleDeleteExperience(item.id)} className="delete-icon">🗑️ Delete</button>
                      </div>
                    </div>
                  )}

                  <div className="timeline-card-header">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="company-name">{item.company}</p>
                    </div>
                    <span className="period">{item.period}</span>
                  </div>
                  <ul className="timeline-details">
                    {item.details && item.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.article>
          ))}

          {isEditingPage && (
            <div className="timeline-card add-new-exp" onClick={handleAddExperience}>
              <div className="add-content">
                <span className="plus-icon">+</span>
                <h3>Add New Experience</h3>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {isAdmin && (
        <div className="admin-controls-fixed">
          {isEditingPage ? (
            <>
              <button onClick={handleSavePage} className="btn save-btn">Done Editing</button>
              <button onClick={handleCancelPage} className="btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={handleStartEditingPage} className="btn edit-page-btn">Edit Experience</button>
          )}
        </div>
      )}
    </>
  );
};

export default Experience;