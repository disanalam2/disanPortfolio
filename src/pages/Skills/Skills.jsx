import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/admin/AdminBottomBar';
import SkillCategoryView from './SkillsCategoryView';
import SkillCategoryEdit from './SkillsCategoryEdit';
import SectionTitle from '../../components/ui/SectionTitle';
import SEO from '../../components/common/SEO';
import './Skills.scss';

const Skills = () => {
  const { isAdmin } = useAuth();
  const { data: skillsData, setData: setSkillsData, loading } = useFetch('/skills');
  const { postData } = useWrite();

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [newSkillInputs, setNewSkillInputs] = useState({});

  // Complex Drag Ref logic (specific for 2D array of Skills)
  const dragCategoryItem = useRef(null);
  const dragCategoryOverItem = useRef(null);
  const dragSkillItem = useRef(null);
  const dragSkillOverItem = useRef(null);
  const dragSkillCategory = useRef(null); 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (skillsData) setTempData(skillsData);
  }, [skillsData]);

  const handleStartEditing = () => {
    setTempData(JSON.parse(JSON.stringify(skillsData)));
    setIsEditing(true);
  };

  const handleCategorySort = () => {
    if(dragCategoryItem.current === null || dragCategoryOverItem.current === null) return;
    const updatedData = [...tempData];
    const draggedItemContent = updatedData.splice(dragCategoryItem.current, 1)[0];
    updatedData.splice(dragCategoryOverItem.current, 0, draggedItemContent);
    setTempData(updatedData);
  };

  const handleSkillSort = (catIndex) => {
    if (dragSkillCategory.current !== catIndex || dragSkillItem.current === null) return;
    const updatedData = [...tempData];
    const skillsList = [...updatedData[catIndex].skills];
    const draggedItemContent = skillsList.splice(dragSkillItem.current, 1)[0];
    skillsList.splice(dragSkillOverItem.current, 0, draggedItemContent);
    updatedData[catIndex].skills = skillsList;
    setTempData(updatedData);
  };

  // Add / Edit Handlers
  const handleCategoryChange = (index, newName) => {
    setTempData(tempData.map((cat, i) => i === index ? { ...cat, category: newName } : cat));
  };
  const handleAddSkill = (catIndex) => {
    const skillName = newSkillInputs[catIndex];
    if (skillName?.trim()) {
      setTempData(tempData.map((cat, i) => i === catIndex ? { ...cat, skills: [...(cat.skills || []), skillName.trim()] } : cat));
      setNewSkillInputs({ ...newSkillInputs, [catIndex]: '' });
    }
  };
  const handleRemoveSkill = (catIndex, skillIndex) => {
    setTempData(tempData.map((cat, i) => i === catIndex ? { ...cat, skills: cat.skills.filter((_, s) => s !== skillIndex) } : cat));
  };
  const handleDeleteCategory = (catIndex) => {
    if (window.confirm("Is category ko delete karna chahte hain?")) setTempData(tempData.filter((_, i) => i !== catIndex));
  };

  const handleSave = async () => {
    try {
      const response = await postData('/skills/sync', tempData);
      if (response.success) {
        setSkillsData(tempData); 
        setIsEditing(false);
        alert('Skills successfully updated!');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) { alert("Backend se connect nahi ho paya!"); }
  };

  if (loading) return <Loader message="Loading Skills..." />;
  const displayData = isEditing ? tempData : skillsData;

  // Generate dynamic keywords for SEO
  let dynamicKeywords = "Skills, Technologies, Frontend, Backend, Database";
  if (skillsData && skillsData.length > 0) {
    const allSkills = new Set();
    skillsData.forEach(cat => cat.skills?.forEach(s => allSkills.add(typeof s === 'string' ? s : s.name)));
    if (allSkills.size > 0) {
      dynamicKeywords = Array.from(allSkills).slice(0, 15).join(', ');
    }
  }

  // Custom button for bottom bar
  const CustomAddCategoryBtn = <button onClick={() => setTempData([...tempData, { category: "New Category", skills: [] }])} className="btn category-btn">+ Category</button>;

  return (
    <PageLayout className="skills-section">
      <SEO 
        title="Skills | Disan Alam" 
        description="Explore Disan Alam's technical skills and tech stack, including React.js, Node.js, Express.js, MySQL, and modern web development technologies." 
        url="skills"
        keywords={dynamicKeywords}
      />
      <SectionTitle title="My Skills" />
      {displayData?.length === 0 && !isEditing && <p className="empty-state">No skills added yet.</p>}

      <div className="skills-container">
        {Array.isArray(displayData) && displayData.map((catItem, catIndex) => (
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
              <SkillCategoryEdit 
                catIndex={catIndex} catItem={catItem} 
                handleCategoryChange={handleCategoryChange} handleDeleteCategory={handleDeleteCategory} 
                handleRemoveSkill={handleRemoveSkill} handleAddSkill={handleAddSkill} 
                newSkillInput={newSkillInputs[catIndex]} setNewSkillInput={(idx, val) => setNewSkillInputs({...newSkillInputs, [idx]: val})}
                dragSkillItem={dragSkillItem} dragSkillOverItem={dragSkillOverItem} dragSkillCategory={dragSkillCategory} handleSkillSort={handleSkillSort}
              />
            ) : (
              <SkillCategoryView catItem={catItem} />
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <AdminBottomBar isEditing={isEditing} onEdit={handleStartEditing} onSave={handleSave} onCancel={() => setIsEditing(false)} saveLabel="Save All" customAction={CustomAddCategoryBtn} />
      )}
    </PageLayout>
  );
};

export default Skills;