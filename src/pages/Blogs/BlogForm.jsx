import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const BlogForm = ({ blog, onSave, onCancel }) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    
    let safeStr = dateString;
    if (!safeStr.includes('Z') && !safeStr.includes('+')) {
      if (safeStr.includes(' ')) safeStr = safeStr.replace(' ', 'T');
      safeStr += 'Z'; 
    }
    
    const date = new Date(safeStr);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    summary: blog?.summary || '',
    content: blog?.content || '',
    thumbnail: blog?.thumbnail || '',
    scheduledFor: formatDateTime(blog?.scheduledFor)
  });

  let initialSafeDate = blog?.scheduledFor || null;
  if (initialSafeDate && !initialSafeDate.includes('Z') && !initialSafeDate.includes('+')) {
    if (initialSafeDate.includes(' ')) initialSafeDate = initialSafeDate.replace(' ', 'T');
    initialSafeDate += 'Z';
  }
  const isScheduledInitial = initialSafeDate && new Date(initialSafeDate) > new Date();
  
  const [publishMode, setPublishMode] = useState(isScheduledInitial ? 'schedule' : 'now');

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    if (publishMode === 'schedule' && dataToSave.scheduledFor) {
      dataToSave.scheduledFor = new Date(dataToSave.scheduledFor).toISOString();
    } else {
      dataToSave.scheduledFor = null;
    }
    onSave(blog?.id, dataToSave);
  };

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
    <form onSubmit={handleSubmit} className="admin-form-card" style={{ padding: '20px', background: 'var(--glass-bg)', border: '1px solid var(--accent-color)', borderRadius: '12px', width: '100%' }}>
      <h3 style={{ marginBottom: '15px' }}>{blog?.id ? 'Edit Blog' : 'New Blog'}</h3>
      
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Thumbnail Image</label>
        {formData.thumbnail && (
            <img src={formData.thumbnail} alt="Thumbnail Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
        )}
        <input type="file" accept="image/*" onChange={handleThumbnailChange} required={!formData.thumbnail} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" required style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>URL Slug (e.g., how-to-code)</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="how-to-code" required style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Short Summary</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief description..." required rows="3" style={{ width: '100%', padding: '10px', borderRadius: '6px' }} />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Publishing Mode</label>
        <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="publishMode" value="now" checked={publishMode === 'now'} onChange={(e) => setPublishMode(e.target.value)} />
            Publish Now
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="publishMode" value="schedule" checked={publishMode === 'schedule'} onChange={(e) => setPublishMode(e.target.value)} />
            Schedule for later
          </label>
        </div>
      </div>

      {publishMode === 'schedule' && (
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Schedule Date & Time</label>
          <input 
            type="datetime-local" 
            name="scheduledFor" 
            value={formData.scheduledFor} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }} 
          />
          <small style={{ color: 'var(--text-color-secondary)' }}>The blog will be hidden from public until this exact time.</small>
        </div>
      )}

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label>Markdown Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="# Heading\nWrite your markdown content here..." required rows="10" style={{ width: '100%', padding: '10px', borderRadius: '6px', fontFamily: 'monospace' }} />
      </div>

      <div className="form-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {publishMode === 'now' ? 'Publish Now' : 'Save Scheduled'}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
