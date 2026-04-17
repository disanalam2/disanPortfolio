import '../styles/project.scss';
import { motion } from 'framer-motion';

const Project = () => {
  // Project data array
  const projectsData = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "A personal portfolio website created with React and Vite, designed to present my skills, projects, work experience, and contact details in a polished and responsive layout.",
      techStack: ["React", "Vite", "Sass", "JavaScript", "HTML", "CSS", "Framer Motion", "React Router", "GitHub Pages"],
      githubLink: "https://github.com/disanalam2/disanPortfolio",
      liveLink: ""
    },
    {
      id: 2,
      title: "School Website",
      description: "Built a school exhibition website for Firayalal Public School using HTML, CSS, and JavaScript. Designed a clean homepage with section-based navigation Created separate pages for About, Admissions, Academics, Media, Infrastructure, and more Added a “Get in Touch” page with Google Maps, contact details, and an inquiry form Included a login page layout for future portal access Organized the project with separate CSS, JavaScript, and content files for maintainability",
      techStack: ["HTML", "CSS", "JavaScript"],
      githubLink: "https://github.com/disanalam2/SchoolWebsite",
      liveLink: "https://fpsexibition2023.web.app/"
    },
    {
      id: 3,
      title: "Demo Services Website(HTML, CSS, JavaScript)",
      description: "",
      techStack: ["Html","CSS", "JavaScript"],
      githubLink: "https://github.com/disanalam2/demo-service-website-HTML-CSS-JS",
      liveLink: "https://demoservicewebsite-html-css-js.web.app/"
    },
    {
      id: 4,
      title: "Demo Services Website(React, Vite, JavaScript, CSS)",
      description: "",
      techStack: ["React","Vite", "JavaScript","CSS"],
      githubLink: "https://github.com/disanalam2/demo-software-service-website-ReactVite"
    },
    {
      id: 5,
      title: "Demo Factory Website",
      description: "",
      techStack: ["Html", "JavaScript", "CSS"],
      githubLink: "https://github.com/disanalam2/demofactorywebsite-HTML",
      liveLink: ""
    }
  ];

  return (
    <motion.section
      className="projects-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h2 className="section-title">My Projects</h2>
      <div className="projects-container">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: project.id * 0.1, duration: 0.45, ease: 'easeOut' }}
          >
            <h3>{project.title}</h3>
            <div className="project-actions">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn">
                View on GitHub
              </a>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn secondary">
                  Live Demo
                </a>
              )}
            </div>
            <p className="desc">{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-pill">{tech}</span>
              ))}
            </div>
            
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Project;