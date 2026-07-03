import React, { useState, useEffect } from 'react';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', problemFaced: '', techStack: '', githubLink: '', githubLinkBackend: '', liveLink: '', imageUrls: '', videoUrl: ''
  });

  const [uploading, setUploading] = useState(false);

  // Mount hone par existing project details set karo
  useEffect(() => {
    const imagesStr = project.media?.filter(m => m.type === 'image').map(m => m.url).join(', ') || '';
    const videoStr = project.media?.find(m => m.type === 'video')?.url || '';

    setFormData({
      ...project,
      techStack: project.techStack ? project.techStack.join(', ') : '',
      imageUrls: imagesStr,
      videoUrl: videoStr
    });
  }, [project]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Admin token
        },
        body: uploadData
      });

      const data = await response.json();
      if (data.success) {
        // Purane links me naya link comma laga kar jod do
        setFormData(prev => ({
          ...prev,
          imageUrls: prev.imageUrls ? `${prev.imageUrls}, ${data.url}` : data.url
        }));
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

  const handleSaveClick = () => {
    // Strings ko wapas arrays me convert karo API ke liye
    const newMedia = [];
    if (formData.videoUrl && formData.videoUrl.trim() !== '') {
      newMedia.push({ type: 'video', url: formData.videoUrl.trim() });
    }
    if (formData.imageUrls && formData.imageUrls.trim() !== '') {
      const imgLinks = formData.imageUrls.split(',').map(s => s.trim()).filter(s => s);
      imgLinks.forEach(link => newMedia.push({ type: 'image', url: link }));
    }

    const updatedData = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
      media: newMedia
    };

    onSave(project.id, updatedData);
  };

  return (
    <div className="project-edit-form">
      <InputField name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" className="edit-input bold" />

      <div className="media-inputs" style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ margin: 0 }}>Images (Comma separated links):</label>
          <div>
            <label htmlFor={`upload-${project.id || 'new'}`} style={{ cursor: 'pointer', background: 'var(--accent-color)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {uploading ? 'Uploading...' : 'Upload Image to S3'}
            </label>
            <input 
              type="file" 
              id={`upload-${project.id || 'new'}`} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
        </div>
        <TextAreaField name="imageUrls" value={formData.imageUrls} onChange={handleChange} placeholder="https://img1.jpg, https://img2.jpg" className="edit-input" rows="2" />
        
        <label>Video (Direct .mp4 link):</label>
        <InputField name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://video.mp4" className="edit-input" />
      </div>

      <TextAreaField name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="edit-input desc" rows="3" />
      <TextAreaField name="problemFaced" value={formData.problemFaced || ''} onChange={handleChange} placeholder="Problem Faced" className="edit-input desc" rows="3" />
      <InputField name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma separated)" className="edit-input" />
      <InputField name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="Frontend GitHub Link" className="edit-input" />
      <InputField name="githubLinkBackend" value={formData.githubLinkBackend || ''} onChange={handleChange} placeholder="Backend GitHub Link" className="edit-input" />
      <InputField name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Demo Link" className="edit-input" />

      <div className="card-edit-actions">
        <button onClick={handleSaveClick} className="btn save-btn">Save Done</button>
        <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ProjectForm;