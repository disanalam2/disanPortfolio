import '../styles/experience.scss';
import { motion } from 'framer-motion';

const experienceItems = [
  {
    role: 'Web Developer',
    company: 'GDG on Campus, Haldia Institute of Technology',
    period: 'April 2026 - Present',
    details: [
      'Learning and applying web development technologies such as HTML, CSS, JavaScript, React, Node.js, and Express.',
      'Building projects to gain hands-on experience and enhance my skills in front-end and back-end development.',
      'Collaborating with peers and mentors to improve my coding abilities and understanding of web development concepts.'
    ]
  },
  
];

const Experience = () => {
  return (
    <motion.section
      className="experience-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="section-header">
        <h2>Experience</h2>
        <p>Roles, projects, and hands-on work that demonstrate how I build real products.</p>
      </div>
      <div className="timeline">
        {experienceItems.map((item) => (
          <article className="timeline-card" key={item.role}>
            <div className="timeline-card-header">
              <div>
                <h3>{item.role}</h3>
                <p className="company-name">{item.company}</p>
              </div>
              <span className="period">{item.period}</span>
            </div>
            <ul className="timeline-details">
              {item.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
