import '../styles/project.scss';
import { motion } from 'framer-motion';

const Project = () => {
  // Project data array
  const projectsData = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "A fully responsive personal portfolio website with seamless routing and modular components.",
      techStack: ["React", "Vite", "Sass"],
      githubLink: "https://github.com/disanalam2/disanPortfolio",
      liveLink: ""
    },
    {
      id: 2,
      title: "School Website",
      description: "A robust backend system handling user requests, routing, and data management.",
      techStack: ["HTML", "CSS", "JavaScript"],
      githubLink: "https://github.com/disanalam2/SchoolWebsite",
      liveLink: ""
    },
    {
      id: 3,
      title: "Demo Services Website(HTML, CSS, JavaScript)",
      description: "A dynamic e-commerce platform with product listings, shopping cart, and checkout functionality.",
      techStack: ["Html","CSS", "JavaScript"],
      githubLink: "https://github.com/disanalam2/demo-service-website-HTML-CSS-JS"
    },
    {
      id: 4,
      title: "Demo Services Website(React, Vite, JavaScript, CSS)",
      description: "A dynamic e-commerce platform with product listings, shopping cart, and checkout functionality.",
      techStack: ["React","Vite", "JavaScript","CSS"],
      githubLink: "https://github.com/disanalam2/demo-software-service-website-ReactVite"
    },
    {
      id: 5,
      title: "Demo Factory Website",
      description: "A simple yet effective task management application with drag-and-drop functionality.",
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
            <p className="desc">{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-pill">{tech}</span>
              ))}
            </div>
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Project;