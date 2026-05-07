import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certificate', 'Contact'];

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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;