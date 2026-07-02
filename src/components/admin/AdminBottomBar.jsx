import React from 'react';

const AdminBottomBar = ({ 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  editLabel = "Edit Details", 
  saveLabel = "Done Editing", 
  customAction = null 
}) => {
  return (
    <div className="admin-controls-fixed">
      {isEditing ? (
        <>
          {/* Agar extra button chahiye (Jaise Skills me '+ Category') */}
          {customAction && customAction}
          
          <button onClick={onSave} className="btn save-btn">
            {saveLabel}
          </button>
          
          <button onClick={onCancel} className="btn cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={onEdit} className="btn edit-page-btn">
          {editLabel}
        </button>
      )}
    </div>
  );
};

export default AdminBottomBar;