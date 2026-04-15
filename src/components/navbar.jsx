// components/navbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <div className="logo">
          <NavLink to="/">
            <img src="./src/assets/DISAN ALAM.JPG" alt="Photo" />
            Disan Alam

          </NavLink>
        </div>

        {/* Animated Hamburger Icon */}
        <div className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {['About', 'Skills', 'Projects', 'Contact'].map(link => (
            <li key={link}>
              <NavLink
                to={link === 'About' ? '/' : `/${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
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