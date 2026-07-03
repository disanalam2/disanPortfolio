import React from 'react';
import CardActionMenu from '../../components/admin/CardActionMenu';

const EducationCard = ({ item, isEditingPage, onEdit, onDelete }) => {
  return (
    <>
      {isEditingPage && (
        <CardActionMenu onEdit={onEdit} onDelete={onDelete} showDragHandle={false} />
      )}
      <div className="timeline-card-header">
        <div>
          <h3>{item.degree}</h3>
          <p className="company-name">{item.institution}</p>
        </div>
        <span className="period">{item.period}</span>
      </div>
    </>
  );
};

export default EducationCard;
