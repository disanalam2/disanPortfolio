import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certificate', 'Contact'];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
    alert('Admin Logged Out Successfully! 👋');
  };

  const [resumeLink, setResumeLink] = useState(localStorage.getItem('resumeLink') || '/Disan Alam - Resume.pdf');

  const handleEditResumeLink = () => {
    const newLink = prompt("Enter new Resume Link/URL:", resumeLink);
    if (newLink !== null && newLink.trim() !== "") {
      setResumeLink(newLink.trim());
      localStorage.setItem('resumeLink', newLink.trim());
      alert("Resume link updated successfully (Frontend only)!");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <div className="logo">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="./DISAN ALAM.JPG" alt="Disan Alam Logo" />
            Disan Alam
          </NavLink>
        </div>

        {/* Animated Hamburger Icon */}
        <div 
          className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                title="Edit Resume Link (Frontend Only)"
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
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