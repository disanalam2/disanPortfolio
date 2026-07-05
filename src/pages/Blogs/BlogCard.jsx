import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardActionMenu from '../../components/admin/CardActionMenu';

const BlogCard = ({ blog, isEditingPage, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <>
      {isEditingPage && (
        <CardActionMenu 
          onEdit={onEdit} 
          onDelete={onDelete} 
          showDragHandle={false} 
        />
      )}

      {blog.thumbnail && (
        <div className="project-media-carousel">
          <img src={blog.thumbnail} alt={blog.title} loading="lazy" decoding="async" className="carousel-media image" style={{ objectFit: 'cover' }} />
        </div>
      )}

      <h3>{blog.title}</h3>
      <p style={{ margin: '10px 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
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
