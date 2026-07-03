import React from 'react';
import Button from '../../components/ui/Button';
import MediaCarousel from '../../components/common/MediaCarousel';
import CardActionMenu from '../../components/admin/CardActionMenu';

const ProjectCard = ({ project, isEditingPage, onEdit, onDelete, onViewDetails }) => {
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
        {project.liveLink && (
          <Button asLink href={project.liveLink} target="_blank" rel="noopener noreferrer" variant="secondary" className="full-width-btn">
            Live Demo
          </Button>
        )}
        
        {(project.githubLink || project.githubLinkBackend) && (
          <div className="github-links-row">
            {project.githubLink && (
              <Button asLink href={project.githubLink} target="_blank" rel="noopener noreferrer" variant="primary">
                {project.githubLinkBackend ? "Frontend Code" : "View on GitHub"}
              </Button>
            )}
            {project.githubLinkBackend && (
              <Button asLink href={project.githubLinkBackend} target="_blank" rel="noopener noreferrer" variant="primary">
                Backend Code
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className="tech-stack">
        {project.techStack && project.techStack.slice(0, 3).map((tech, i) => (
          <span key={i} className="tech-pill">{tech}</span>
        ))}
        {project.techStack && project.techStack.length > 3 && (
          <span className="tech-pill more">+{project.techStack.length - 3}</span>
        )}
      </div>

      <div className="view-more-container">
        <button className="view-details-btn" onClick={onViewDetails}>
          View Details
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </>
  );
};

export default ProjectCard;