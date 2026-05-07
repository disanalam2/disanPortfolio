import React, { useState, useEffect } from 'react';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrls: '', videoUrl: ''
  });

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

      <div className="media-inputs">
        <label>Images (Comma separated links):</label>
        <TextAreaField name="imageUrls" value={formData.imageUrls} onChange={handleChange} placeholder="https://img1.jpg, https://img2.jpg" className="edit-input" rows="2" />
        
        <label>Video (Direct .mp4 link):</label>
        <InputField name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://video.mp4" className="edit-input" />
      </div>

      <TextAreaField name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="edit-input desc" rows="3" />
      <InputField name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma separated)" className="edit-input" />
      <InputField name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" className="edit-input" />
      <InputField name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Demo Link" className="edit-input" />

      <div className="card-edit-actions">
        <button onClick={handleSaveClick} className="btn save-btn">Save Done</button>
        <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ProjectForm;