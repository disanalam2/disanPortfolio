import React from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import SocialLinks from '../../components/common/SocialLinks';

const AboutView = ({ aboutData }) => {
  return (
    <>
      <Card className="about-details">
        <img src={aboutData.photo || "/disan-alam.webp"} alt="Disan Alam - Full Stack Developer" loading="lazy" decoding="async" />
        <h1 className="title">{aboutData.title || "Loading..."}</h1>
        <p className="description">{aboutData.shortDesc || "Loading..."}</p>
        
        {/* Modular Social Links component */}
        <SocialLinks />

        <div className="action-buttons">
          <Button to="/projects" variant="primary">View My Work</Button>
          <Button to="/contact" variant="secondary">Contact Me</Button>
        </div>
      </Card>

      <Card className="about-content">
        <p className="description">Who I am <br /></p>
        <p className="description">{aboutData.whoIAm}</p>

        <p className="description">What I do <br /></p>
        <p className="description">{aboutData.whatIDo}</p>

        <p className="description">How I work <br /></p>
        <p className="description">{aboutData.howIWork}</p>
      </Card>
    </>
  );
};

export default AboutView;