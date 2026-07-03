import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    } catch (error) { alert("Error saving project details!"); }
  };

  if (loading) return <Loader message="Loading Projects..." />;
  const displayData = isEditingPage ? tempData : projectsData;

  return (
    <PageLayout className="projects-section">
      <SectionTitle title="My Projects" />
      {displayData?.length === 0 && !isEditingPage && (
        <p className="empty-state">No projects found.</p>
      )}

      <div className="projects-container">
        {displayData?.map((project, index) => (
          <motion.div
            key={project.id}
            className={`project-card ${isEditingPage ? 'draggable-card' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isEditingPage ? { duration: 0 } : { delay: index * 0.1, duration: 0.45 }}
            draggable={isEditingPage && editingProjectId !== project.id}
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
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
              {selectedProject.githubLink && (
                <Button asLink href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" variant="primary">
                  View on GitHub
                </Button>
              )}
              {selectedProject.liveLink && (
                <Button asLink href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" variant="secondary">
                  Live Demo
                </Button>
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