import React from 'react';
import SocialLinks from '../common/SocialLinks';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container container">
        <p className="footer-copy">© {year} Disan Alam</p>
        
        {/* Naya modular component use kiya */}
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;