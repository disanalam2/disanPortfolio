import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/common/AdminBottomBar';
import ExperienceTimeline from './ExperienceTimeline';
import ExperienceForm from './ExperienceForm';
import './experience.scss';

const Experience = () => {
  const { isAdmin } = useAuth();
  const { data: experienceData, setData: setExperienceData, loading } = useFetch('/experience');
  const { postData, putData, deleteData } = useWrite();

  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingExpId, setEditingExpId] = useState(null);

  useEffect(() => {
    if (experienceData) setTempData(experienceData);
  }, [experienceData]);

  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(experienceData)));
    setIsEditingPage(true);
  };

  const handleSavePage = () => {
    setExperienceData(tempData);
    setIsEditingPage(false);
    setEditingExpId(null);
  };

  const handleAddExperience = async () => {
    const newTemplate = { role: 'New Role Title', company: 'Company Name', period: 'Month Year - Month Year', details: ['Point 1...', 'Point 2...'] };
    try {
      const response = await postData('/experience/add', newTemplate);
      if (response.success) {
        const newExp = { ...newTemplate, id: response.insertId };
        setTempData([newExp, ...tempData]);
        setExperienceData([newExp, ...experienceData]);
      }
    } catch (error) { alert("Backend se connect nahi ho paya!"); }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await deleteData(`/experience/delete/${id}`);
        if (response.success) {
          setTempData(tempData.filter(exp => exp.id !== id));
          setExperienceData(experienceData.filter(exp => exp.id !== id));
        }
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const saveExperienceDetails = async (id, updatedData) => {
    try {
      const response = await putData(`/experience/update/${id}`, updatedData);
      if (response.success) {
        const finalData = tempData.map(exp => exp.id === id ? updatedData : exp);
        setTempData(finalData);
        setExperienceData(finalData);
        setEditingExpId(null);
        alert("Experience updated safely!");
      }
    } catch (error) { alert("Error saving experience details!"); }
  };

  if (loading) return <Loader message="Loading Experience..." />;
  const displayData = isEditingPage ? tempData : experienceData;

  return (
    <PageLayout className="experience-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Roles, projects, and hands-on work that demonstrate how I build real products.</p>
      </div>

      {displayData?.length === 0 && !isEditingPage && <p style={{ textAlign: "center", color: "#9ca3af" }}>No experience added yet.</p>}

      <div className="timeline">
        {displayData?.map((item, index) => (
          <motion.article
            className="timeline-card"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.4 }}
          >
            {editingExpId === item.id ? (
              <ExperienceForm experience={item} onSave={saveExperienceDetails} onCancel={() => setEditingExpId(null)} />
            ) : (
              <ExperienceTimeline item={item} isEditingPage={isEditingPage} onEdit={() => setEditingExpId(item.id)} onDelete={() => handleDeleteExperience(item.id)} />
            )}
          </motion.article>
        ))}

        {isEditingPage && (
          <div className="timeline-card add-new-exp" onClick={handleAddExperience}>
            <div className="add-content"><span className="plus-icon">+</span><h3>Add New Experience</h3></div>
          </div>
        )}
      </div>

      {isAdmin && <AdminBottomBar isEditing={isEditingPage} onEdit={handleStartEditingPage} onSave={handleSavePage} onCancel={() => setIsEditingPage(false)} />}
    </PageLayout>
  );
};

export default Experience;