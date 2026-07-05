import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/admin/AdminBottomBar';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';
import SectionTitle from '../../components/ui/SectionTitle';
import SEO from '../../components/common/SEO';
import './education.scss';

const Education = () => {
  const { isAdmin } = useAuth();
  const { data: educationData, setData: setEducationData, loading } = useFetch('/education');
  const { postData, putData, deleteData } = useWrite();

  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingEduId, setEditingEduId] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (educationData) setTempData(educationData);
  }, [educationData]);

  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(educationData)));
    setIsEditingPage(true);
  };

  const handleSavePage = () => {
    setEducationData(tempData);
    setIsEditingPage(false);
    setEditingEduId(null);
  };

  const handleAddEducation = async () => {
    const newTemplate = { degree: 'New Degree', institution: 'Institution Name', period: 'Month Year - Month Year', details: [] };
    try {
      const response = await postData('/education/add', newTemplate);
      if (response.success) {
        const newEdu = { ...newTemplate, id: response.insertId };
        setTempData([newEdu, ...tempData]);
        setEducationData([newEdu, ...educationData]);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) { alert("Backend se connect nahi ho paya!"); }
  };

  const handleDeleteEducation = async (id) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      try {
        const response = await deleteData(`/education/delete/${id}`);
        if (response.success) {
          setTempData(tempData.filter(edu => edu.id !== id));
          setEducationData(educationData.filter(edu => edu.id !== id));
        }
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const saveEducationDetails = async (id, updatedData) => {
    try {
      const response = await putData(`/education/update/${id}`, updatedData);
      if (response.success) {
        const finalData = tempData.map(edu => edu.id === id ? updatedData : edu);
        setTempData(finalData);
        setEducationData(finalData);
        setEditingEduId(null);
        alert("Education updated safely!");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) { alert("Error saving education details!"); }
  };

  if (loading) return <Loader message="Loading Education..." />;
  const displayData = isEditingPage ? tempData : educationData;

  return (
    <PageLayout className="education-section">
      <SEO 
        title="Education" 
        description="My academic background, degrees, and the institutions where I built my foundation in software development." 
        url="education"
      />
      <SectionTitle title="My Education" />
      <div className="section-header">
        <p>Academic background, degrees, and institutions that built my foundation.</p>
      </div>

      {displayData?.length === 0 && !isEditingPage && <p className="empty-state">No education added yet.</p>}

      <div className="timeline">
        {displayData?.map((item, index) => (
          <motion.article
            className="timeline-card"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.4 }}
          >
            {editingEduId === item.id ? (
              <EducationForm education={item} onSave={saveEducationDetails} onCancel={() => setEditingEduId(null)} />
            ) : (
              <EducationCard item={item} isEditingPage={isEditingPage} onEdit={() => setEditingEduId(item.id)} onDelete={() => handleDeleteEducation(item.id)} />
            )}
          </motion.article>
        ))}

        {isEditingPage && (
          <div className="timeline-card add-new-edu" onClick={handleAddEducation}>
            <div className="add-content"><span className="plus-icon">+</span><h3>Add New Education</h3></div>
          </div>
        )}
      </div>

      {isAdmin && <AdminBottomBar isEditing={isEditingPage} onEdit={handleStartEditingPage} onSave={handleSavePage} onCancel={() => setIsEditingPage(false)} />}
    </PageLayout>
  );
};

export default Education;
