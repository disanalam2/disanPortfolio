import React, { useState, useRef, useEffect } from 'react';
import '../styles/certificate.scss';
import { motion } from 'framer-motion';

const Certificate = ({ isAdmin }) => {
  const [certificatesData, setCertificatesData] = useState([]);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingCertId, setEditingCertId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // ================= DATABASE SE FETCH KARNA =================
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('https://d3sh63r9ecih9a.cloudfront.net/api/certificates');
        if (response.ok) {
          const data = await response.json();
          setCertificatesData(data);
          setTempData(data);
        }
      } catch (error) {
        console.error("Database se certificates laane me error:", error);
      }
    };
    fetchCertificates();
  }, []);

  // ================= DRAG & DROP HANDLER =================
  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const updatedData = [...tempData];
    const draggedItemContent = updatedData.splice(dragItem.current, 1)[0];
    updatedData.splice(dragOverItem.current, 0, draggedItemContent);
    setTempData(updatedData);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // ================= PAGE LEVEL HANDLERS =================
  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(certificatesData)));
    setIsEditingPage(true);
  };

  const handleSavePage = () => {
    setCertificatesData(tempData);
    setIsEditingPage(false);
    setEditingCertId(null);
  };

  const handleCancelPage = () => {
    setTempData([...certificatesData]);
    setIsEditingPage(false);
    setEditingCertId(null);
  };

  // ================= ADD NAYA CERTIFICATE =================
  const handleAddCertificate = async () => {
    const newCertTemplate = {
      title: 'New Certificate Title',
      issuer: 'Issuing Organization',
      issue_date: 'Month Year', // DB column ke hisaab se update kiya
      description: 'Short description about what you learned...',
      href: '',
      image: '' 
    };

    try {
      const response = await fetch('https://d3sh63r9ecih9a.cloudfront.net/api/certificates/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // <-- NAYA HEADER ADD KIYA
         },
        body: JSON.stringify(newCertTemplate)
      });
      const data = await response.json();
      
      if (data.success) {
        const newCert = { ...newCertTemplate, id: data.insertId };
        setTempData([newCert, ...tempData]);
        setCertificatesData([newCert, ...certificatesData]);
      }
    } catch (error) {
      console.error("Certificate add karne me error:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  // ================= DELETE CERTIFICATE =================
  const handleDeleteCertificate = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate permanently?")) {
      try {
        const response = await fetch(`https://d3sh63r9ecih9a.cloudfront.net/api/certificates/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        const data = await response.json();

        if (data.success) {
          setTempData(tempData.filter(cert => cert.id !== id));
          setCertificatesData(certificatesData.filter(cert => cert.id !== id));
        }
      } catch (error) {
        console.error("Delete karne me error:", error);
      }
    }
  };

  // ================= CARD EDIT HANDLERS =================
  const startEditingCertificate = (cert) => {
    setEditingCertId(cert.id);
    setEditFormData({ ...cert });
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // ================= UPDATE CERTIFICATE =================
  const saveCertificateDetails = async (id) => {
    try {
      const response = await fetch(`https://d3sh63r9ecih9a.cloudfront.net/api/certificates/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // <-- NAYA HEADER ADD KIYA
        } ,
        body: JSON.stringify(editFormData)
      });
      
      const data = await response.json();
      if (data.success) {
        const finalData = tempData.map(cert => cert.id === id ? editFormData : cert);
        setTempData(finalData);
        setCertificatesData(finalData);
        setEditingCertId(null);
        alert("Certificate details updated safely!");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error saving certificate details!");
    }
  };

  const displayData = isEditingPage ? tempData : certificatesData;

  return (
    <>
      <motion.section
        className="certificate-section container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2>Certificates</h2>
          <p>Verified credentials and training that show the tools, frameworks, and workflows I use every day.</p>
        </div>

        {displayData.length === 0 && !isEditingPage && (
          <p style={{textAlign: "center", color: "#9ca3af"}}>No certificates added yet.</p>
        )}

        <div className="certificate-grid">
          {displayData.map((certificate, index) => (
            <motion.article
              className={`certificate-card ${isEditingPage ? 'draggable-card' : ''}`}
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.4 }}

              draggable={isEditingPage && editingCertId !== certificate.id}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >

              {/* ================= EDIT FORM VIEW ================= */}
              {editingCertId === certificate.id ? (
                <div className="cert-edit-form">
                  <input type="text" name="title" value={editFormData.title} onChange={handleFormChange} placeholder="Certificate Title" className="edit-input bold" />
                  <div className="flex-inputs">
                    <input type="text" name="issuer" value={editFormData.issuer} onChange={handleFormChange} placeholder="Issuer (e.g. Coursera)" className="edit-input half" />
                    <input type="text" name="issue_date" value={editFormData.issue_date} onChange={handleFormChange} placeholder="Date" className="edit-input half" />
                  </div>
                  <textarea name="description" value={editFormData.description} onChange={handleFormChange} placeholder="Description" className="edit-input desc" rows="3" />
                  <input type="text" name="href" value={editFormData.href} onChange={handleFormChange} placeholder="Credential Link" className="edit-input" />
                  <input type="text" name="image" value={editFormData.image} onChange={handleFormChange} placeholder="Image URL / Path" className="edit-input" />

                  <div className="card-edit-actions">
                    <button onClick={() => saveCertificateDetails(certificate.id)} className="btn save-btn">Save Done</button>
                    <button onClick={() => setEditingCertId(null)} className="btn cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (

                /* ================= NORMAL VIEW ================= */
                <>
                  {isEditingPage && (
                    <div className="card-admin-bar">
                      <span className="drag-handle" title="Drag to reorder">☰</span>
                      <div className="action-icons">
                        <button onClick={() => startEditingCertificate(certificate)} className="edit-icon">✏️ Edit</button>
                        <button onClick={() => handleDeleteCertificate(certificate.id)} className="delete-icon">🗑️ Delete</button>
                      </div>
                    </div>
                  )}

                  <div className="certificate-card-body">
                    <div className="certificate-image">
                      {certificate.image ? (
                        <img src={certificate.image} alt={`${certificate.title} certificate`} />
                      ) : (
                        <div className="no-image-placeholder">No Image</div>
                      )}
                    </div>

                    <div className="certificate-copy">
                      <div className="card-top">
                        <span className="certificate-title">{certificate.title}</span>
                        <span className="certificate-date">{certificate.issue_date}</span>
                      </div>
                      <p className="certificate-issuer">{certificate.issuer}</p>
                      <p className="certificate-description">{certificate.description}</p>
                      {certificate.href && (
                        <a className="certificate-link" href={certificate.href} target="_blank" rel="noreferrer">
                          View credential
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.article>
          ))}

          {isEditingPage && (
            <article className="certificate-card add-new-cert" onClick={handleAddCertificate}>
              <div className="add-content">
                <span className="plus-icon">+</span>
                <h3>Add New Certificate</h3>
              </div>
            </article>
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
            <button onClick={handleStartEditingPage} className="btn edit-page-btn">Edit Certificates</button>
          )}
        </div>
      )}
    </>
  );
};

export default Certificate;