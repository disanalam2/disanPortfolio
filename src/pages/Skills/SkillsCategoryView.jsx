import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const SkillCategoryView = ({ catItem }) => {
  return (
    <>
      <h3 className="category-title">{catItem.category}</h3>
      <div className="skills-grid">
        {catItem.skills?.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            className="skill-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + skillIndex * 0.05, duration: 0.4 }}
          >
            <p>{skill}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SkillCategoryView;