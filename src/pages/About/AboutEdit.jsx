import React from 'react';
import TextAreaField from '../../components/form/TextAreaField';

const AboutEdit = ({ tempData, imagePreview, handleInputChange, handleImageChange, uploading, box3Config = {} }) => {
  return (
    <div className="about-edit-grid">
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

        <div style={{ width: '100%' }}>
          <p className="description" style={{ marginBottom: '5px' }}>Role / Subtitle (Under About Me Header) <br /></p>
          <TextAreaField 
            name="title" 
            className="title edit-input" 
            value={tempData.title || ''} 
            onChange={handleInputChange} 
            rows="2" 
            placeholder="AI Systems Architect & Full-Stack Engineer"
          />
        </div>
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

      {/* Box 3 Customization (Idea 2: Architectural Capabilities) */}
      <div className="about-box3-edit" style={{ gridColumn: '1 / -1', marginTop: '1.5rem', padding: '1.25rem', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.04)' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6D28D9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
          <span>⚙️</span> Box 3: Architectural Capabilities (Manual Customization)
        </h4>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Yahan se aap About section ke Box 3 me dikhne wali 4 capabilities aur bottom text ko manually badal sakte hain.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Capability 1</label>
            <input 
              name="box3_cap1"
              className="edit-input"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-hover)' }}
              value={tempData.box3_cap1 !== undefined ? tempData.box3_cap1 : (box3Config.cap1 || 'Agentic AI Automation')}
              onChange={handleInputChange}
              placeholder="e.g. Agentic AI Automation"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Capability 2</label>
            <input 
              name="box3_cap2"
              className="edit-input"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-hover)' }}
              value={tempData.box3_cap2 !== undefined ? tempData.box3_cap2 : (box3Config.cap2 || 'Real-Time WebSocket Pipelines')}
              onChange={handleInputChange}
              placeholder="e.g. Real-Time WebSocket Pipelines"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Capability 3</label>
            <input 
              name="box3_cap3"
              className="edit-input"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-hover)' }}
              value={tempData.box3_cap3 !== undefined ? tempData.box3_cap3 : (box3Config.cap3 || 'Cloud-Native Microservices')}
              onChange={handleInputChange}
              placeholder="e.g. Cloud-Native Microservices"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Capability 4</label>
            <input 
              name="box3_cap4"
              className="edit-input"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-hover)' }}
              value={tempData.box3_cap4 !== undefined ? tempData.box3_cap4 : (box3Config.cap4 || 'OWASP & API Security')}
              onChange={handleInputChange}
              placeholder="e.g. OWASP & API Security"
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Bottom Subtext</label>
          <input 
            name="box3_subtext"
            className="edit-input"
            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-hover)' }}
            value={tempData.box3_subtext !== undefined ? tempData.box3_subtext : (box3Config.subtext || 'Zero-Downtime Distributed Systems')}
            onChange={handleInputChange}
            placeholder="e.g. Zero-Downtime Distributed Systems"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutEdit;