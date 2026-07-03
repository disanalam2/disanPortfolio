import React, { useState } from 'react';
import InputField from '../../components/form/InputField';
import Button from '../../components/ui/Button';

const EducationForm = ({ education, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    institution: education?.institution || '',
    period: education?.period || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.degree || !formData.institution || !formData.period) {
      alert("Degree, Institution, and Period are required!");
      return;
    }

    const updatedData = {
      ...education,
      ...formData,
      details: []
    };

    onSave(education.id, updatedData);
  };

  return (
    <div className="experience-edit-form">
      <InputField name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree (e.g. B.Tech Computer Science)" className="edit-input" />
      <InputField name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution (e.g. XYZ University)" className="edit-input" />
      <InputField name="period" value={formData.period} onChange={handleChange} placeholder="Period (e.g. Aug 2018 - May 2022)" className="edit-input" />
      
      <div className="form-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <Button onClick={handleSubmit} variant="primary">Save</Button>
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
      </div>
    </div>
  );
};

export default EducationForm;
