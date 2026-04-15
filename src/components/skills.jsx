import '../styles/skills.scss';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillList = [
    'Java', 'HTML', 'CSS', 'JavaScript',
    'React', 'Node.js', 'Express',
    'Sass (SCSS)', 'Git / GitHub', 'Vite', 'C', 'Python', 'MySQL', 'NumPy', 'Pandas', 'Matplotlib'
  ];

  return (
    <motion.section
      className="skills-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h2 className="section-title">My Skills</h2>
      <div className="skills-grid">
        {skillList.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: 'easeOut' }}
          >
            <p>{skill}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;