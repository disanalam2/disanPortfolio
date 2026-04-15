import '../styles/project.scss';

const Project = () => {
  // Project data array
  const projectsData = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "A fully responsive personal portfolio website with seamless routing and modular components.",
      techStack: ["React", "Vite", "Sass"],
      githubLink: "https://github.com/yourusername/portfolio"
    },
    {
      id: 2,
      title: "Backend API Project",
      description: "A robust backend system handling user requests, routing, and data management.",
      techStack: ["Node.js", "Express", "JavaScript"],
      githubLink: "https://github.com/disanalam2"
    }
  ];

  return (
    <section className="projects-section container">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-container">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p className="desc">{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-pill">{tech}</span>
              ))}
            </div>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;