import React, { useState, useEffect } from 'react';
import '../styles/about.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = ({ isAdmin }) => {
  // Shuru me empty state rakhenge
  const [aboutData, setAboutData] = useState({
    photo: "",
    title: "Loading...",
    shortDesc: "Loading...",
    whoIAm: "Loading...",
    whatIDo: "Loading...",
    howIWork: "Loading..."
  });
 
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  // DATABASE SE DATA FETCH KARNA
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://13.232.90.249:5000/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
          setTempData(data);
          setImagePreview(data.photo);
        }
      } catch (error) {
        console.error("Database se data lane me error:", error);
      }
    };

    fetchAboutData();
  }, []);

  const handleInputChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTempData({ ...tempData, photo: reader.result }); // Base64 string save hogi
      };
      reader.readAsDataURL(file);
    }
  };

  // DATABASE ME DATA SAVE KARNA
  const handleSave = async () => {
    try {
      const response = await fetch('http://13.232.90.249:5000/api/about/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(tempData)
      });

      const data = await response.json();

      if (data.success) {
        setAboutData(tempData); // UI Update
        setIsEditing(false);
        alert('About details Database me permanently save ho gayi hain!');
      } else {
        alert("Save karne me error aaya.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  const handleCancel = () => {
    setTempData({ ...aboutData });
    setImagePreview(aboutData.photo);
    setIsEditing(false);
  };

  // UI Code (Jo pehle tha wahi hai, koi change nahi)
  return (
    <> 
      <motion.section
        className="about-section container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="about-details">
          {/* Photo Edit */}
          {isEditing ? (
            <div className="edit-photo-wrapper">
              {imagePreview ? <img src={imagePreview} alt="Disan PIC" /> : <div style={{width: 170, height: 170, borderRadius: '50%', background: '#333'}}></div>}
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            </div>
          ) : (
             <img src={aboutData.photo || "./DISAN ALAM.JPG"} alt="Disan PIC" />
          )}

          {isEditing ? (
            <textarea name="title" className="title edit-input" value={tempData.title || ''} onChange={handleInputChange} rows="2" />
          ) : (
            <h1 className="title">{aboutData.title}</h1>
          )}
          {isEditing ? (
            <textarea name="shortDesc" className="description edit-input" value={tempData.shortDesc || ''} onChange={handleInputChange} rows="3" />
          ) : (
            <p className="description">{aboutData.shortDesc}</p>
          )}
          
          <div className="social-links" aria-label="Social links">
             {/* ... (Social Links SVG same as before) ... */}
            <a href="https://linkedin.com/in/disanalam" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://github.com/disanalam2" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
            <a href="mailto:disanalamofficial@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            <a href="https://instagram.com/disanalam2005" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://wa.me/918789047170" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>

          <div className="action-buttons">
            <Link to="/projects" className="btn primary-btn">View My Work</Link>
            <Link to="/contact" className="btn secondary-btn">Contact Me</Link>
          </div>
        </div>

        <div className="about-content">
          <p className="description">Who I am <br /></p>
          {isEditing ? (
            <textarea name="whoIAm" className="description edit-input" value={tempData.whoIAm || ''} onChange={handleInputChange} rows="5" />
          ) : (
            <p className="description">{aboutData.whoIAm}</p>
          )}

          <p className="description">What I do <br /></p>
          {isEditing ? (
            <textarea name="whatIDo" className="description edit-input" value={tempData.whatIDo || ''} onChange={handleInputChange} rows="5" />
          ) : (
            <p className="description">{aboutData.whatIDo}</p>
          )}

          <p className="description">How I work <br /></p>
          {isEditing ? (
            <textarea name="howIWork" className="description edit-input" value={tempData.howIWork || ''} onChange={handleInputChange} rows="5" />
          ) : (
            <p className="description">{aboutData.howIWork}</p>
          )}
        </div>
      </motion.section>

      {isAdmin && (
        <div className="admin-controls">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn primary-btn save-btn">Save Changes</button>
              <button onClick={handleCancel} className="btn secondary-btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn primary-btn edit-page-btn">Edit About Details</button>
          )}
        </div>
      )}
    </> 
  );
};

export default About;