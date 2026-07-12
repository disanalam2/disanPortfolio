import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import { useDragAndDrop } from '../../hooks/DragAndDrop';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/admin/AdminBottomBar';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import SectionTitle from '../../components/ui/SectionTitle';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import MediaCarousel from '../../components/common/MediaCarousel';
import SEO from '../../components/common/SEO';
import './projects.scss';

const Projects = () => {
  const { isAdmin } = useAuth();
  const { data: projectsData, setData: setProjectsData, loading } = useFetch('/projects');
  const { postData, putData, deleteData } = useWrite();

  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState(null);

  // Drag and Drop Hook
  const { dragItem, dragOverItem, handleSort } = useDragAndDrop(tempData, setTempData);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (projectsData) setTempData(projectsData);
  }, [projectsData]);

  // Page level editing
  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(projectsData)));
    setIsEditingPage(true);
  };
  const handleSavePage = () => {
    setProjectsData(tempData);
    setIsEditingPage(false);
    setEditingProjectId(null);
  };
  const handleCancelPage = () => {
    setTempData([...projectsData]);
    setIsEditingPage(false);
    setEditingProjectId(null);
  };

  // Backend Actions
  const handleAddProject = async () => {
    const newTemplate = { title: "New Project", description: "Project description...", problemFaced: "", techStack: ["React"], githubLink: "", liveLink: "", media: [] };
    try {
      const response = await postData('/projects/add', newTemplate);
      if (response.success) {
        const newProject = { ...newTemplate, id: response.insertId };
        setTempData([newProject, ...tempData]);
        setProjectsData([newProject, ...projectsData]);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) { alert("Backend se connect nahi ho paya!"); }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project permanently?")) {
      try {
        const response = await deleteData(`/projects/delete/${id}`);
        if (response.success) {
          setTempData(tempData.filter(proj => proj.id !== id));
          setProjectsData(projectsData.filter(proj => proj.id !== id));
        }
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const saveProjectDetails = async (id, updatedData) => {
    try {
      const response = await putData(`/projects/update/${id}`, updatedData);
      if (response.success) {
        const finalData = tempData.map(proj => proj.id === id ? updatedData : proj);
        setTempData(finalData);
        setProjectsData(finalData);
        setEditingProjectId(null);
        alert("Project details updated safely!");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) { alert("Error saving project details!"); }
  };

  if (loading) return <Loader message="Loading Projects..." />;
  const displayData = isEditingPage ? tempData : projectsData;

  // Generate dynamic keywords for SEO
  let dynamicKeywords = "Projects, Portfolio, Web Development, Full Stack";
  if (projectsData && projectsData.length > 0) {
    const allTech = new Set();
    projectsData.forEach(p => p.techStack?.forEach(t => allTech.add(t)));
    if (allTech.size > 0) {
      dynamicKeywords = Array.from(allTech).slice(0, 10).join(', ');
    }
  }

  const projectListSchema = displayData && displayData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": displayData.map((proj, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": proj.liveLink || "https://disanalam.me/projects",
      "name": proj.title,
      "description": proj.description
    }))
  } : null;

  return (
    <PageLayout className="projects-section">
      <SEO 
        title="Projects | Disan Alam" 
        description="Check out Disan Alam's portfolio of real-world projects, including scalable web applications, enterprise platforms, modern UIs, and full-stack solutions." 
        url="projects"
        keywords={dynamicKeywords}
        schema={projectListSchema}
      />
      <SectionTitle title="My Projects" />
      {displayData?.length === 0 && !isEditingPage && (
        <p className="empty-state">No projects found.</p>
      )}

      <div className="projects-container">
        {displayData?.map((project, index) => (
          <Tilt
            key={project.id}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            transitionSpeed={1000}
            scale={1.02}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#ffffff"
            glarePosition="all"
            gyroscope={false}
            trackOnWindow={false}
            className="tilt-wrapper"
            tiltEnable={!isEditingPage}
            style={{ display: 'flex', height: '100%' }}
          >
            <motion.div
              className={`project-card ${isEditingPage ? 'draggable-card' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.45 }}
              draggable={isEditingPage && editingProjectId !== project.id}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              style={{ width: '100%' }}
            >
              {editingProjectId === project.id ? (
                <ProjectForm project={project} onSave={saveProjectDetails} onCancel={() => setEditingProjectId(null)} />
              ) : (
                <ProjectCard 
                  project={project} 
                  isEditingPage={isEditingPage} 
                  onEdit={() => setEditingProjectId(project.id)} 
                  onDelete={() => handleDeleteProject(project.id)} 
                  onViewDetails={() => setSelectedProject(project)}
                />
              )}
            </motion.div>
          </Tilt>
        ))}

        {isEditingPage && (
          <div className="project-card add-new-card" onClick={handleAddProject}>
            <div className="add-content">
              <span className="plus-icon">+</span>
              <h3>Add New Project</h3>
            </div>
          </div>
        )}
      </div>

      {isAdmin && (
        <AdminBottomBar isEditing={isEditingPage} onEdit={handleStartEditingPage} onSave={handleSavePage} onCancel={handleCancelPage} />
      )}

      {/* Project Details Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="project-modal-details">
            <MediaCarousel media={selectedProject.media} />
            
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="project-actions modal-actions">
              {selectedProject.liveLink && (
                <Button asLink href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" variant="secondary" className="full-width-btn">
                  Live Demo
                </Button>
              )}
              
              {(selectedProject.githubLink || selectedProject.githubLinkBackend) && (
                <div className="github-links-row">
                  {selectedProject.githubLink && (
                    <Button asLink href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" variant="primary">
                      {selectedProject.githubLinkBackend ? "Frontend Code" : "View on GitHub"}
                    </Button>
                  )}
                  {selectedProject.githubLinkBackend && (
                    <Button asLink href={selectedProject.githubLinkBackend} target="_blank" rel="noopener noreferrer" variant="primary">
                      Backend Code
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="modal-section">
              <h3>About Project</h3>
              <p className="desc">{selectedProject.description}</p>
            </div>
            
            {selectedProject.problemFaced && (
              <div className="modal-section">
                <h3>Problem Faced</h3>
                <p className="desc">{selectedProject.problemFaced}</p>
              </div>
            )}
            
            <div className="modal-section">
              <h3>Technologies Used</h3>
              <div className="tech-stack">
                {selectedProject.techStack && selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};

export default Projects;