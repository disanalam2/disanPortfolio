import React from 'react';
import TextAreaField from '../../components/form/TextAreaField';

const AboutEdit = ({ tempData, imagePreview, handleInputChange, handleImageChange }) => {
  return (
    <>
      <div className="about-details">
        <div className="edit-photo-wrapper">
          {imagePreview ? (
            <img src={imagePreview} alt="Disan PIC" />
          ) : (
            <div style={{width: 170, height: 170, borderRadius: '50%', background: '#333'}}></div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        </div>

        <TextAreaField 
          name="title" 
          className="title edit-input" 
          value={tempData.title || ''} 
          onChange={handleInputChange} 
          rows="2" 
        />
        <TextAreaField 
          name="shortDesc" 
          className="description edit-input" 
          value={tempData.shortDesc || ''} 
          onChange={handleInputChange} 
          rows="3" 
        />
        <div style={{ marginTop: '1rem' }}>
          <p className="description" style={{ marginBottom: '5px' }}>Resume Link (PDF URL) <br /></p>
          <input 
            name="resume_link" 
            className="edit-input" 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
            value={tempData.resume_link || ''} 
            onChange={handleInputChange} 
            placeholder="https://example.com/resume.pdf"
          />
        </div>
      </div>

      <div className="about-content">
        <p className="description">Who I am <br /></p>
        <TextAreaField 
          name="whoIAm" 
          className="description edit-input" 
          value={tempData.whoIAm || ''} 
          onChange={handleInputChange} 
          rows="5" 
        />

        <p className="description">What I do <br /></p>
        <TextAreaField 
          name="whatIDo" 
          className="description edit-input" 
          value={tempData.whatIDo || ''} 
          onChange={handleInputChange} 
          rows="5" 
        />

        <p className="description">How I work <br /></p>
        <TextAreaField 
          name="howIWork" 
          className="description edit-input" 
          value={tempData.howIWork || ''} 
          onChange={handleInputChange} 
          rows="5" 
        />
      </div>
    </>
  );
};

export default AboutEdit;