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