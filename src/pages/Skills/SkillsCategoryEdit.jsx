import React from 'react';
import InputField from '../../components/form/InputField';

const SkillCategoryEdit = ({ 
  catIndex, 
  catItem, 
  handleCategoryChange, 
  handleDeleteCategory, 
  handleRemoveSkill, 
  handleAddSkill, 
  newSkillInput, 
  setNewSkillInput,
  dragSkillItem,
  dragSkillOverItem,
  dragSkillCategory,
  handleSkillSort
}) => {
  return (
    <>
      <div className="category-header-edit">
        <span className="drag-handle" title="Drag to rearrange category">☰</span>
        <InputField 
          type="text" 
          className="category-edit-input"
          value={catItem.category} 
          onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
        />
        <button onClick={() => handleDeleteCategory(catIndex)} style={{background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Delete Category</button>
      </div>

      <div className="skills-grid">
        {catItem.skills?.map((skill, skillIndex) => (
          <div
            key={skillIndex}
            className="skill-card draggable-skill"
            draggable
            onDragStart={() => { dragSkillItem.current = skillIndex; dragSkillCategory.current = catIndex; }}
            onDragEnter={() => (dragSkillOverItem.current = skillIndex)}
            onDragEnd={() => handleSkillSort(catIndex)}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{skill}</p>
            <button className="delete-skill-btn" onClick={() => handleRemoveSkill(catIndex, skillIndex)}>×</button>
          </div>
        ))}

        <div className="add-skill-card">
          <input 
            type="text" 
            placeholder="Add skill..." 
            value={newSkillInput || ''}
            onChange={(e) => setNewSkillInput(catIndex, e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(catIndex)}
          />
          <button onClick={() => handleAddSkill(catIndex)}>+</button>
        </div>
      </div>
    </>
  );
};

export default SkillCategoryEdit;