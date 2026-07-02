import React from 'react';
import CardActionMenu from '../../components/admin/CardActionMenu';

const ExperienceTimeline = ({ item, isEditingPage, onEdit, onDelete }) => {
  return (
    <>
      {isEditingPage && (
        <CardActionMenu 
          onEdit={onEdit} 
          onDelete={onDelete} 
          showDragHandle={false} // Experience me drag&drop nahi tha
        />
      )}

      <div className="timeline-card-header">
        <div>
          <h3>{item.role}</h3>
          <p className="company-name">{item.company}</p>
        </div>
        <span className="period">{item.period}</span>
      </div>
      
      <ul className="timeline-details">
        {item.details && item.details.map((detail, idx) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </>
  );
};

export default ExperienceTimeline;