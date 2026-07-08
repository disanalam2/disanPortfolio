import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const BlogForm = ({ blog, onSave, onCancel }) => {
  // Format datetime-local string (YYYY-MM-DDTHH:MM) in local time
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    summary: blog?.summary || '',
    content: blog?.content || '',
    thumbnail: blog?.thumbnail || '',
    scheduledFor: formatDateTime(blog?.scheduledFor)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-form-card" style={{ padding: '20px', background: 'var(--glass-bg)', border: '1px solid var(--accent-color)', borderRadius: '12px', width: '100%' }}>
      <h3 style={{ marginBottom: '15px' }}>{blog?.id ? 'Edit Blog' : 'New Blog'}</h3>
      
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Thumbnail Image</label>
        {formData.thumbnail && (
            <img src={formData.thumbnail} alt="Thumbnail Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
        )}
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>URL Slug (e.g., how-to-code)</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="how-to-code" style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Short Summary</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief description..." rows="3" style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Schedule Publication (Optional)</label>
        <input 
          type="datetime-local" 
          name="scheduledFor" 
          value={formData.scheduledFor} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '10px', borderRadius: '6px' }} 
        />
        <small style={{ color: 'var(--text-color-secondary)' }}>If set, the blog will be hidden from public until this time.</small>
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Markdown Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="# Heading\nWrite your markdown content here..." rows="10" style={{ width: '100%', padding: '10px', borderRadius: '6px', fontFamily: 'monospace' }} />
      </div>

      <div className="form-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={() => {
          // Convert scheduledFor local string back to a proper Date ISO string to send to backend
          const dataToSave = { ...formData };
          if (dataToSave.scheduledFor) {
            dataToSave.scheduledFor = new Date(dataToSave.scheduledFor).toISOString();
          } else {
            dataToSave.scheduledFor = null;
          }
          onSave(blog?.id, dataToSave);
        }}>Save Blog</Button>
      </div>
    </div>
  );
};

export default BlogForm;
