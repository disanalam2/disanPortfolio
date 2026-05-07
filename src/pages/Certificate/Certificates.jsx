import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import { useDragAndDrop } from '../../hooks/DragAndDrop';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/common/AdminBottomBar';
import CertificateCard from './CertificateCard';
import CertificateForm from './CertificateForm';
import './certificate.scss';

const Certificates = () => {
  const { isAdmin } = useAuth();
  const { data: certificatesData, setData: setCertificatesData, loading } = useFetch('/certificates');
  const { postData, putData, deleteData } = useWrite();

  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingCertId, setEditingCertId] = useState(null);

  // Drag and drop sorting custom hook
  const { dragItem, dragOverItem, handleSort } = useDragAndDrop(tempData, setTempData);

  useEffect(() => {
    if (certificatesData) setTempData(certificatesData);
  }, [certificatesData]);

  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(certificatesData)));
    setIsEditingPage(true);
  };
  const handleSavePage = () => {
    setCertificatesData(tempData);
    setIsEditingPage(false);
    setEditingCertId(null);
  };

  const handleAddCertificate = async () => {
    const newTemplate = { title: 'New Certificate', issuer: 'Issuer', issue_date: 'Date', description: 'Desc...', href: '', image: '' };
    try {
      const response = await postData('/certificates/add', newTemplate);
      if (response.success) {
        const newCert = { ...newTemplate, id: response.insertId };
        setTempData([newCert, ...tempData]);
        setCertificatesData([newCert, ...certificatesData]);
      }
    } catch (error) { alert("Backend se connect nahi ho paya!"); }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm("Delete this certificate permanently?")) {
      try {
        const response = await deleteData(`/certificates/delete/${id}`);
        if (response.success) {
          setTempData(tempData.filter(cert => cert.id !== id));
          setCertificatesData(certificatesData.filter(cert => cert.id !== id));
        }
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const saveCertificateDetails = async (id, updatedData) => {
    try {
      const response = await putData(`/certificates/update/${id}`, updatedData);
      if (response.success) {
        const finalData = tempData.map(cert => cert.id === id ? updatedData : cert);
        setTempData(finalData);
        setCertificatesData(finalData);
        setEditingCertId(null);
        alert("Certificate details updated!");
      }
    } catch (error) { alert("Error saving details!"); }
  };

  if (loading) return <Loader message="Loading Certificates..." />;
  const displayData = isEditingPage ? tempData : certificatesData;

  return (
    <PageLayout className="certificate-section">
      <div className="section-header">
        <h2>Certificates</h2>
        <p>Verified credentials and training that show the tools, frameworks, and workflows I use every day.</p>
      </div>

      {displayData?.length === 0 && !isEditingPage && <p style={{textAlign: "center", color: "#9ca3af"}}>No certificates added yet.</p>}

      <div className="certificate-grid">
        {displayData?.map((certificate, index) => (
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
            {editingCertId === certificate.id ? (
              <CertificateForm certificate={certificate} onSave={saveCertificateDetails} onCancel={() => setEditingCertId(null)} />
            ) : (
              <CertificateCard certificate={certificate} isEditingPage={isEditingPage} onEdit={() => setEditingCertId(certificate.id)} onDelete={() => handleDeleteCertificate(certificate.id)} />
            )}
          </motion.article>
        ))}

        {isEditingPage && (
          <article className="certificate-card add-new-cert" onClick={handleAddCertificate}>
            <div className="add-content"><span className="plus-icon">+</span><h3>Add New Certificate</h3></div>
          </article>
        )}
      </div>

      {isAdmin && <AdminBottomBar isEditing={isEditingPage} onEdit={handleStartEditingPage} onSave={handleSavePage} onCancel={() => setIsEditingPage(false)} />}
    </PageLayout>
  );
};

export default Certificates;