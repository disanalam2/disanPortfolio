import React from 'react';
import TextAreaField from '../../components/form/TextAreaField';

const AboutEdit = ({ tempData, imagePreview, handleInputChange, handleImageChange, uploading }) => {
  return (
    <>
      <div className="about-details">
        <div className="edit-photo-wrapper">
          {imagePreview ? (
            <img src={imagePreview} alt="Disan PIC" />
          ) : (
            <div style={{width: 170, height: 170, borderRadius: '50%', background: '#333'}}></div>
          )}
          {uploading ? (
            <div style={{width: 170, height: 170, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 'bold'}}>Uploading...</div>
          ) : (
            <>
              <label htmlFor="about-photo-upload" style={{cursor: 'pointer', background: 'var(--accent-color)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '10px', display: 'inline-block'}}>
                Upload to S3
              </label>
              <input id="about-photo-upload" type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
            </>
          )}
        </div>

        <div style={{ marginTop: '1rem', marginBottom: '1.5rem', width: '100%' }}>
          <p className="description" style={{ marginBottom: '5px' }}>Or Paste Image Link <br /></p>
          <input 
            name="photo" 
            className="edit-input" 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--glass-bg)', color: "var(--text-primary)", border: '1px solid var(--glass-hover)' }}
            value={tempData.photo || ''} 
            onChange={handleInputChange} 
            placeholder="https://example.com/photo.jpg"
          />
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
            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--glass-bg)', color: "var(--text-primary)", border: '1px solid var(--glass-hover)' }}
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