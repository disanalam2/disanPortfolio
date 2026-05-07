import React, { useState, useEffect } from 'react';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    role: '', company: '', period: '', detailsStr: ''
  });

  useEffect(() => {
    setFormData({
      ...experience,
      // Array ko new line string me badalna taaki textarea me dikhe
      detailsStr: experience.details ? experience.details.join('\n') : ''
    });
  }, [experience]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveClick = () => {
    // String ko wapas Array (bullet points) me badalna
    const detailsArray = formData.detailsStr.split('\n').filter(point => point.trim() !== '');
    
    const updatedData = {
      ...formData,
      details: detailsArray
    };
    onSave(experience.id, updatedData);
  };

  return (
    <div className="exp-edit-form">
      <InputField name="role" value={formData.role} onChange={handleChange} placeholder="Job Role (e.g. Web Developer)" className="edit-input bold" />
      <InputField name="company" value={formData.company} onChange={handleChange} placeholder="Company / Organization Name" className="edit-input company-input" />
      <InputField name="period" value={formData.period} onChange={handleChange} placeholder="Duration (e.g. Jan 2025 - Present)" className="edit-input" />

      <label className="input-label">Details (Har naya point nayi line me likhein):</label>
      <TextAreaField name="detailsStr" value={formData.detailsStr} onChange={handleChange} placeholder="Did this...\nDid that..." className="edit-input desc" rows="5" />

      <div className="card-edit-actions">
        <button onClick={handleSaveClick} className="btn save-btn">Save Done</button>
        <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ExperienceForm;