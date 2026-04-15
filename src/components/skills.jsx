import '../styles/skills.scss';

const Skills = () => {
  // Array of skills - aap isme apne hisaab se add/remove kar sakte hain
  const skillList = [
    "Java", "HTML", "CSS", "JavaScript", 
    "React", "Node.js", "Express", 
    "Sass (SCSS)", "Git / GitHub", "Vite","C","Python","MySQL","Numpy","Pandas","Matplotlib "
  ];

  return (
    <section className="skills-section container">
      <h2 className="section-title">My Skills</h2>
      <div className="skills-grid">
        {skillList.map((skill, index) => (
          <div key={index} className="skill-card">
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;