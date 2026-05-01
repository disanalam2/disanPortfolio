import React, { useState, useRef, useEffect } from 'react';
import '../styles/project.scss';
import { motion } from 'framer-motion';

// --- Photo/Video Slider Component ---
const MediaCarousel = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!media || media.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [media]);

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className="project-media-carousel">
      {currentMedia.type === 'video' ? (
        <video src={currentMedia.url} autoPlay muted loop playsInline className="carousel-media video" />
      ) : (
        <img src={currentMedia.url} alt="Project Demo" className="carousel-media image" />
      )}

      {media.length > 1 && (
        <div className="carousel-dots">
          {media.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const Project = ({ isAdmin }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // ================= DATABASE SE FETCH KARNA =================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://d3sh63r9ecih9a.cloudfront.net/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjectsData(data);
          setTempData(data);
        }
      } catch (error) {
        console.error("Database se projects laane me error:", error);
      }
    };
    fetchProjects();
  }, []);

  // ================= DRAG & DROP (Local Sorting) =================
  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const updatedData = [...tempData];
    const draggedItemContent = updatedData.splice(dragItem.current, 1)[0];
    updatedData.splice(dragOverItem.current, 0, draggedItemContent);
    setTempData(updatedData);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // ================= PAGE LEVEL HANDLERS =================
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

  // ================= DATABASE ME NAYA PROJECT ADD KARNA =================
  const handleAddProject = async () => {
    const newProjectTemplate = {
      title: "New Project",
      description: "Project description goes here...",
      techStack: ["React"],
      githubLink: "",
      liveLink: "",
      media: []
    };

    try {
      const response = await fetch('https://d3sh63r9ecih9a.cloudfront.net/api/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`

        },
        body: JSON.stringify(newProjectTemplate)
      });
      const data = await response.json();

      if (data.success) {
        // Database ne jo nayi ID generate ki hai, usko add kar lenge
        const newProject = { ...newProjectTemplate, id: data.insertId };
        setTempData([newProject, ...tempData]); // Naya project list me sabse aage aayega
        setProjectsData([newProject, ...projectsData]);
      }
    } catch (error) {
      console.error("Project add karne me error:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  // ================= DATABASE SE PROJECT DELETE KARNA =================
  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project permanently?")) {
      try {
        const response = await fetch(`https://d3sh63r9ecih9a.cloudfront.net/api/projects/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // <-- NAYA HEADER ADD KIYA
          }
        });
        const data = await response.json();

        if (data.success) {
          setTempData(tempData.filter(proj => proj.id !== id));
          setProjectsData(projectsData.filter(proj => proj.id !== id));
        }
      } catch (error) {
        console.error("Delete karne me error:", error);
      }
    }
  };

  // ================= CARD EDIT HANDLERS =================
  const startEditingProject = (project) => {
    setEditingProjectId(project.id);

    // Arrays ko string me badalna taaki input box me type kar sakein
    const imagesStr = project.media?.filter(m => m.type === 'image').map(m => m.url).join(', ') || '';
    const videoStr = project.media?.find(m => m.type === 'video')?.url || '';

    setEditFormData({
      ...project,
      techStack: project.techStack ? project.techStack.join(', ') : '',
      imageUrls: imagesStr,
      videoUrl: videoStr
    });
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // ================= DATABASE ME PROJECT UPDATE KARNA =================
  const saveProjectDetails = async (id) => {
    // Strings ko wapas Array (TechStack aur Media) me convert karna
    const newMedia = [];
    if (editFormData.videoUrl && editFormData.videoUrl.trim() !== '') {
      newMedia.push({ type: 'video', url: editFormData.videoUrl.trim() });
    }
    if (editFormData.imageUrls && editFormData.imageUrls.trim() !== '') {
      const imgLinks = editFormData.imageUrls.split(',').map(s => s.trim()).filter(s => s);
      imgLinks.forEach(link => newMedia.push({ type: 'image', url: link }));
    }

    const updatedProjectData = {
      ...editFormData,
      techStack: editFormData.techStack.split(',').map(s => s.trim()).filter(s => s),
      media: newMedia
    };

    try {
      const response = await fetch(`https://d3sh63r9ecih9a.cloudfront.net/api/projects/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
         },
        body: JSON.stringify(updatedProjectData)
      });

      const data = await response.json();
      if (data.success) {
        const finalData = tempData.map(proj => proj.id === id ? updatedProjectData : proj);
        setTempData(finalData);
        setProjectsData(finalData); // Main data sync kar do
        setEditingProjectId(null);
        alert("Project details updated safely!");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error saving project details!");
    }
  };

  const displayData = isEditingPage ? tempData : projectsData;

  return (
    <>
      <motion.section
        className="projects-section container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="section-title">My Projects</h2>

        {displayData.length === 0 && !isEditingPage && (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>No projects found. Admin can add new projects.</p>
        )}

        <div className="projects-container">
          {displayData.map((project, index) => (
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
                // ================= EDIT FORM VIEW =================
                <div className="project-edit-form">
                  <input type="text" name="title" value={editFormData.title} onChange={handleFormChange} placeholder="Project Title" className="edit-input bold" />

                  {/* Media Inputs */}
                  <div className="media-inputs">
                    <label>Images (Comma separated links):</label>
                    <textarea name="imageUrls" value={editFormData.imageUrls} onChange={handleFormChange} placeholder="https://img1.jpg, https://img2.jpg" className="edit-input" rows="2" />

                    <label>Video (Direct .mp4 link):</label>
                    <input type="text" name="videoUrl" value={editFormData.videoUrl} onChange={handleFormChange} placeholder="https://video.mp4" className="edit-input" />
                  </div>

                  <textarea name="description" value={editFormData.description} onChange={handleFormChange} placeholder="Description" className="edit-input desc" rows="3" />
                  <input type="text" name="techStack" value={editFormData.techStack} onChange={handleFormChange} placeholder="Tech Stack (comma separated)" className="edit-input" />
                  <input type="text" name="githubLink" value={editFormData.githubLink} onChange={handleFormChange} placeholder="GitHub Link" className="edit-input" />
                  <input type="text" name="liveLink" value={editFormData.liveLink} onChange={handleFormChange} placeholder="Live Demo Link" className="edit-input" />

                  <div className="card-edit-actions">
                    <button onClick={() => saveProjectDetails(project.id)} className="btn save-btn">Save Done</button>
                    <button onClick={() => setEditingProjectId(null)} className="btn cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (
                // ================= NORMAL VIEW =================
                <>
                  {isEditingPage && (
                    <div className="card-admin-bar">
                      <span className="drag-handle" title="Drag to reorder">☰</span>
                      <div className="action-icons">
                        <button onClick={() => startEditingProject(project)} className="edit-icon">✏️ Edit</button>
                        <button onClick={() => handleDeleteProject(project.id)} className="delete-icon">🗑️ Delete</button>
                      </div>
                    </div>
                  )}

                  <MediaCarousel media={project.media} />

                  <h3>{project.title}</h3>
                  <div className="project-actions">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn">View on GitHub</a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn secondary">Live Demo</a>
                    )}
                  </div>
                  <p className="desc">{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack && project.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </>
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
      </motion.section>

      {isAdmin && (
        <div className="admin-controls-fixed">
          {isEditingPage ? (
            <>
              {/* Ab changes real-time save ho rahe hain, isliye Done Editing rakha hai */}
              <button onClick={handleSavePage} className="btn save-btn">Done Editing</button>
              <button onClick={handleCancelPage} className="btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={handleStartEditingPage} className="btn edit-page-btn">Edit Projects</button>
          )}
        </div>
      )}
    </>
  );
};

export default Project;