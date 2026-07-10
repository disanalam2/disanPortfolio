import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { apiCall } from '../../services/api';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = ['About', 'Skills', 'Projects', 'Blogs', 'Education', 'Experience', 'Certificate', 'Contact'];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
    alert('Admin Logged Out Successfully! 👋');
  };

  const [resumeLink, setResumeLink] = useState('/Disan Alam - Resume.pdf');
  const [logoUrl, setLogoUrl] = useState('/disan-alam.webp');

  // Fetch resume link from backend
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await apiCall('/about');
        if (data && data.resume_link) {
          setResumeLink(data.resume_link);
        }
        if (data && data.photo) {
          setLogoUrl(data.photo);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.error("Failed to fetch resume link");
      }
    };
    fetchAboutData();
  }, []);

  const handleEditResumeLink = async () => {
    if (!isAdmin) return;
    const newLink = prompt("Enter new Resume Link/URL:", resumeLink);
    if (newLink !== null && newLink.trim() !== '') {
      // First fetch current about data to update just the resume_link
      try {
        const currentData = await apiCall('/about');
        
        const updateData = {
          ...currentData,
          resume_link: newLink.trim()
        };

        const res = await apiCall('/about/update', {
          method: 'PUT',
          body: JSON.stringify(updateData)
        });
        
        if (res.success) {
          setResumeLink(newLink.trim());
          alert("Resume link updated successfully in database!");
        } else {
          alert("Failed to update resume link on server.");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Server connection failed.");
      }
    }
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container container">
        <div className="logo">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logoUrl || "/disan-alam.webp"} alt="Disan Alam Logo" decoding="async" width="40" height="40" style={{objectFit: 'cover', borderRadius: '50%'}} />
            Disan Alam
          </NavLink>
        </div>

        {/* Animated Hamburger Icon */}
        <div 
          className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          role="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') setIsMobileMenuOpen(!isMobileMenuOpen); }}
        >
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((link) => (
            <li key={link}>
              <NavLink
                to={link === 'About' ? '/' : `/${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link}
              </NavLink>
            </li>
          ))}

     
          
          {/* Resume Download Button with Edit Option */}
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a 
              href={resumeLink} 
              download={resumeLink.startsWith('http') ? undefined : "Disan_Alam_Resume.pdf"}
              target={resumeLink.startsWith('http') ? "_blank" : "_self"}
              rel="noreferrer"
              className="nav-resume-btn"
            >
              Resume
            </a>
            {isAdmin && (
              <button 
                onClick={handleEditResumeLink}
                title="Edit Resume Link (Database)"
                style={{ 
                  background: 'var(--glass-hover)', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '30px', 
                  height: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                ✏️
              </button>
            )}
          </li>

          {/* Email Automation Link - Only for admin */}
          {isAdmin && (
            <li>
              <NavLink 
                to="/email-automation"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                style={{ color: '#3b82f6', fontWeight: 'bold' }}
              >
                Email Automation
              </NavLink>
            </li>
          )}

          {/* Logout Button - Only show jab admin logged in ho */}
          {isAdmin && (
            <li>
              <button 
                onClick={handleLogout}
                className="nav-logout-btn"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;