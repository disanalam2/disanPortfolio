import React, { useState, useRef, useEffect } from 'react';
import '../styles/skills.scss';
import { motion } from 'framer-motion';

const Skills = ({ isAdmin }) => {
  const [skillsData, setSkillsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [newSkillInputs, setNewSkillInputs] = useState({});

  // ================= DATABASE SE FETCH KARNA =================
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://13.232.90.249:5000/api/skills');
        if (response.ok) {
          const data = await response.json();
          setSkillsData(data);
        }
      } catch (error) {
        console.error("Skills fetch error:", error);
      }
    };
    fetchSkills();
  }, []);

  // ================= DRAG AND DROP REFS =================
  const dragCategoryItem = useRef(null);
  const dragCategoryOverItem = useRef(null);
  const dragSkillItem = useRef(null);
  const dragSkillOverItem = useRef(null);
  const dragSkillCategory = useRef(null); 

  // ================= DRAG AND DROP HANDLERS =================
  const handleCategorySort = () => {
    if(dragCategoryItem.current === null || dragCategoryOverItem.current === null) return;
    const updatedData = [...tempData];
    const draggedItemContent = updatedData.splice(dragCategoryItem.current, 1)[0];
    updatedData.splice(dragCategoryOverItem.current, 0, draggedItemContent);
    setTempData(updatedData);
    dragCategoryItem.current = null;
    dragCategoryOverItem.current = null;
  };

  const handleSkillSort = (catIndex) => {
    if (dragSkillCategory.current !== catIndex || dragSkillItem.current === null || dragSkillOverItem.current === null) return;
    
    const updatedData = [...tempData];
    const skillsList = [...updatedData[catIndex].skills];
    const draggedItemContent = skillsList.splice(dragSkillItem.current, 1)[0];
    skillsList.splice(dragSkillOverItem.current, 0, draggedItemContent);
    
    updatedData[catIndex].skills = skillsList;
    setTempData(updatedData);
    
    dragSkillItem.current = null;
    dragSkillOverItem.current = null;
    dragSkillCategory.current = null;
  };

  // ================= NORMAL HANDLERS =================
  const handleStartEditing = () => {
    // Deep copy taaki original data change na ho jab tak save na dabaye
    setTempData(JSON.parse(JSON.stringify(skillsData)));
    setIsEditing(true);
  };

  const handleCategoryChange = (index, newName) => {
    const updatedData = tempData.map((cat, i) => i === index ? { ...cat, category: newName } : cat);
    setTempData(updatedData);
  };

  const handleAddSkill = (catIndex) => {
    const skillName = newSkillInputs[catIndex];
    if (skillName && skillName.trim() !== '') {
      const updatedData = tempData.map((cat, i) => i === catIndex ? { ...cat, skills: [...cat.skills, skillName.trim()] } : cat);
      setTempData(updatedData);
      setNewSkillInputs({ ...newSkillInputs, [catIndex]: '' });
    }
  };

  const handleSkillInputChange = (catIndex, value) => setNewSkillInputs({ ...newSkillInputs, [catIndex]: value });

  const handleRemoveSkill = (catIndex, skillIndex) => {
    const updatedData = tempData.map((cat, i) => {
      if (i === catIndex) return { ...cat, skills: cat.skills.filter((_, sIndex) => sIndex !== skillIndex) };
      return cat;
    });
    setTempData(updatedData);
  };

  // Delete Category (Aap chahein to specific category hata sakte hain)
  const handleDeleteCategory = (catIndex) => {
    if (window.confirm("Is category ko delete karna chahte hain?")) {
      setTempData(tempData.filter((_, i) => i !== catIndex));
    }
  };

  const handleAddCategory = () => setTempData([...tempData, { category: "New Category", skills: [] }]);

  // ================= DATABASE ME SYNC KARNA =================
  const handleSave = async () => {
    try {
      const response = await fetch('http://13.232.90.249:5000/api/skills/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
         },
        body: JSON.stringify(tempData)
      });
      
      const data = await response.json();
      if (data.success) {
        setSkillsData(tempData); // UI Update
        setIsEditing(false);
        alert('Skills successfully updated in Database!');
      } else {
        alert("Error saving skills!");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  const handleCancel = () => {
    setTempData([]);
    setNewSkillInputs({});
    setIsEditing(false);
  };

  const displayData = isEditing ? tempData : skillsData;

  return (
    <>
      <motion.section
        className="skills-section container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="section-title">My Skills</h2>
        
        {displayData.length === 0 && !isEditing && (
          <p style={{textAlign: "center", color: "#9ca3af"}}>No skills added yet.</p>
        )}

        <div className="skills-container">
          {displayData.map((catItem, catIndex) => (
            <div 
              key={catIndex} 
              className={`skill-category-block ${isEditing ? 'draggable-category' : ''}`}
              draggable={isEditing}
              onDragStart={() => (dragCategoryItem.current = catIndex)}
              onDragEnter={() => (dragCategoryOverItem.current = catIndex)}
              onDragEnd={handleCategorySort}
              onDragOver={(e) => e.preventDefault()}
            >
              
              {isEditing ? (
                <div className="category-header-edit">
                  <span className="drag-handle" title="Drag to rearrange category">☰</span>
                  <input 
                    type="text" 
                    className="category-edit-input"
                    value={catItem.category} 
                    onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                  />
                  <button onClick={() => handleDeleteCategory(catIndex)} style={{background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Delete Category</button>
                </div>
              ) : (
                <h3 className="category-title">{catItem.category}</h3>
              )}

              <div className="skills-grid">
                {catItem.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className={`skill-card ${isEditing ? 'draggable-skill' : ''}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isEditing ? { duration: 0 } : { delay: 0.1 + skillIndex * 0.05, duration: 0.4 }}
                    draggable={isEditing}
                    onDragStart={() => {
                      dragSkillItem.current = skillIndex;
                      dragSkillCategory.current = catIndex;
                    }}
                    onDragEnter={() => (dragSkillOverItem.current = skillIndex)}
                    onDragEnd={() => handleSkillSort(catIndex)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <p>{skill}</p>
                    {isEditing && (
                      <button 
                        className="delete-skill-btn" 
                        onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                      >×</button>
                    )}
                  </motion.div>
                ))}

                {isEditing && (
                  <div className="add-skill-card">
                    <input 
                      type="text" 
                      placeholder="Add skill..." 
                      value={newSkillInputs[catIndex] || ''}
                      onChange={(e) => handleSkillInputChange(catIndex, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(catIndex)}
                    />
                    <button onClick={() => handleAddSkill(catIndex)}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {isAdmin && (
        <div className="admin-controls-fixed">
          {isEditing ? (
            <>
              <button onClick={handleAddCategory} className="btn category-btn">+ Category</button>
              <button onClick={handleSave} className="btn save-btn">Save All</button>
              <button onClick={handleCancel} className="btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={handleStartEditing} className="btn edit-page-btn">Edit Skills</button>
          )}
        </div>
      )}
    </>
  );
};

export default Skills;