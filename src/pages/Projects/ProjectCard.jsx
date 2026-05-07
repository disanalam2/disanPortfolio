import React from 'react';
import MediaCarousel from '../../components/common/MediaCarousel';
import CardActionMenu from '../../components/common/CardActionMenu';

const ProjectCard = ({ project, isEditingPage, onEdit, onDelete }) => {
  return (
    <>
      {isEditingPage && (
        <CardActionMenu 
          onEdit={onEdit} 
          onDelete={onDelete} 
          showDragHandle={true} 
        />
      )}

      <MediaCarousel media={project.media} />

      <h3>{project.title}</h3>
      
      <div className="project-actions">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn">
            View on GitHub
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn secondary">
            Live Demo
          </a>
        )}
      </div>
      
      <p className="desc">{project.description}</p>
      
      <div className="tech-stack">
        {project.techStack && project.techStack.map((tech, i) => (
          <span key={i} className="tech-pill">{tech}</span>
        ))}
      </div>
    </>
  );
};

export default ProjectCard;