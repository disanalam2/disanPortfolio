import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '../../components/common/SocialLinks';

const AboutView = ({ aboutData }) => {
  return (
    <>
      <div className="about-details">
        <img src={aboutData.photo || "./DISAN ALAM.JPG"} alt="Disan PIC" />
        <h1 className="title">{aboutData.title || "Loading..."}</h1>
        <p className="description">{aboutData.shortDesc || "Loading..."}</p>
        
        {/* Modular Social Links component */}
        <SocialLinks />

        <div className="action-buttons">
          <Link to="/projects" className="btn primary-btn">View My Work</Link>
          <Link to="/contact" className="btn secondary-btn">Contact Me</Link>
        </div>
      </div>

      <div className="about-content">
        <p className="description">Who I am <br /></p>
        <p className="description">{aboutData.whoIAm}</p>

        <p className="description">What I do <br /></p>
        <p className="description">{aboutData.whatIDo}</p>

        <p className="description">How I work <br /></p>
        <p className="description">{aboutData.howIWork}</p>
      </div>
    </>
  );
};

export default AboutView;