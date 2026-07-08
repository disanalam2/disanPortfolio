import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardActionMenu from '../../components/admin/CardActionMenu';

const BlogCard = ({ blog, isEditingPage, onEdit, onDelete }) => {
  const navigate = useNavigate();

  let safeDate = blog.scheduledFor || null;
  if (safeDate && !safeDate.includes('Z') && !safeDate.includes('+')) {
    if (safeDate.includes(' ')) safeDate = safeDate.replace(' ', 'T');
    safeDate += 'Z';
  }
  const isScheduled = safeDate && new Date(safeDate) > new Date();

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blogs/${blog.slug}`;
    navigator.clipboard.writeText(url);
    alert("Link copied: " + url);
  };

  return (
    <>
      {isEditingPage && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardActionMenu 
            onEdit={onEdit} 
            onDelete={onDelete} 
            showDragHandle={false} 
          />
          <button 
            onClick={handleCopyLink} 
            style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
            title="Copy Link"
          >
            📋 Copy Link
          </button>
        </div>
      )}

      {isScheduled && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--accent-color)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10 }}>
          🕒 Scheduled
        </div>
      )}

      {blog.thumbnail && (
        <div className="project-media-carousel">
          <img src={blog.thumbnail} alt={blog.title} loading="lazy" decoding="async" className="carousel-media image" style={{ objectFit: 'cover' }} />
        </div>
      )}

      <h3>{blog.title}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0 15px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
        <span>👁️ {blog.views || 0} views</span>
        <span>⏱️ {blog.read_time || 1} min read</span>
      </div>
      <p className="desc">
        {blog.summary}
      </p>

      <div className="view-more-container">
        <button className="view-details-btn" onClick={() => navigate(`/blogs/${blog.slug}`)}>
          Read Article
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </>
  );
};

export default BlogCard;
