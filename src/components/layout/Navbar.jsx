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
          
          {/* Resume Download Button */}
          <li>
            <a 
              href="/Disan Alam - Resume.pdf" 
              download="Disan_Alam_Resume.pdf"
              style={{
                background: 'var(--gradient-primary)',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                marginLeft: '5px',
                display: 'inline-block',
                boxShadow: '0 4px 14px var(--accent-glow)'
              }}
            >
              Resume
            </a>
          </li>

          {/* Logout Button - Only show jab admin logged in ho */}
          {isAdmin && (
            <li>
              <button 
                onClick={handleLogout}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginLeft: '10px'
                }}
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