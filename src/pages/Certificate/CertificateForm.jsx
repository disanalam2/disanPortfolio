import React, { useState, useEffect } from 'react';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

const CertificateForm = ({ certificate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', issuer: '', issue_date: '', description: '', href: '', image: ''
  });

  useEffect(() => {
    setFormData(certificate);
  }, [certificate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="cert-edit-form">
      <InputField name="title" value={formData.title} onChange={handleChange} placeholder="Certificate Title" className="edit-input bold" />
      
      <div className="flex-inputs">
        <InputField name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Issuer (e.g. Coursera)" className="edit-input half" />
        <InputField name="issue_date" value={formData.issue_date} onChange={handleChange} placeholder="Date" className="edit-input half" />
      </div>
      
      <TextAreaField name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="edit-input desc" rows="3" />
      <InputField name="href" value={formData.href} onChange={handleChange} placeholder="Credential Link" className="edit-input" />
      <InputField name="image" value={formData.image} onChange={handleChange} placeholder="Image URL / Path" className="edit-input" />

      <div className="card-edit-actions">
        <button onClick={() => onSave(certificate.id, formData)} className="btn save-btn">Save Done</button>
        <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default CertificateForm;