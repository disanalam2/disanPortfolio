import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { BASE_URL } from '../../services/api';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

const CertificateForm = ({ certificate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', issuer: '', issue_date: '', description: '', href: '', image: ''
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(certificate);
  }, [certificate]);

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    let token = sessionStorage.getItem('adminToken');
    if (token) token = token.replace(/^"(.*)"$/, '$1');

    try {
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert("Upload Failed: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="cert-edit-form">
      <InputField name="title" value={formData.title} onChange={handleChange} placeholder="Certificate Title" className="edit-input bold" />
      
      <div className="flex-inputs">
        <InputField name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Issuer (e.g. Coursera)" className="edit-input half" />
        <InputField name="issue_date" value={formData.issue_date} onChange={handleChange} placeholder="Date" className="edit-input half" />
      </div>
      
      <TextAreaField name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="edit-input desc" rows="3" />
      <InputField name="href" value={formData.href} onChange={handleChange} placeholder="Credential Link" className="edit-input" />
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <InputField name="image" value={formData.image} onChange={handleChange} placeholder="Image URL / Path" className="edit-input" />
        </div>
        <div>
          <label htmlFor={`upload-cert-${certificate.id || 'new'}`} style={{ cursor: 'pointer', background: 'var(--accent-color)', color: '#000', padding: '10px 15px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            {uploading ? 'Uploading...' : 'Upload S3'}
          </label>
          <input 
            type="file" 
            id={`upload-cert-${certificate.id || 'new'}`} 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </div>
      </div>

      <div className="card-edit-actions">
        <button onClick={() => onSave(certificate.id, formData)} className="btn save-btn">Save Done</button>
        <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default CertificateForm;