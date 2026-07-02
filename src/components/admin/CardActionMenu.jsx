import React from 'react';

const CardActionMenu = ({ 
  onEdit, 
  onDelete, 
  showDragHandle = true 
}) => {
  return (
    <div className="card-admin-bar">
      {showDragHandle ? (
        <span className="drag-handle" title="Drag to reorder">☰</span>
      ) : (
        <span></span> // Khali span taaki flex-between layout maintain rahe agar drag na ho
      )}
      
      <div className="action-icons">
        {onEdit && (
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="edit-icon">
            ✏️ Edit
          </button>
        )}
        
        {onDelete && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="delete-icon">
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CardActionMenu;