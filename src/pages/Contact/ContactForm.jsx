import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWrite } from '../../hooks/Write';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';


const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

const ContactForm = () => {
  const { postData, isWriting } = useWrite();
  const location = useLocation();

  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [localNumber, setLocalNumber] = useState('');

  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    preference: 'email',
    contactHandle: '', 
    subject: location.state?.subject || 'Free Technical Performance & SEO Audit',
    websiteUrl: '',
    message: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'preference') {
        newData.contactHandle = ''; // Clear handle when switching method
        setLocalNumber(''); // Clear local number state as well
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalHandle = formData.contactHandle;
    
    if (formData.preference === 'whatsapp') {
      const code = getCountryCallingCode(selectedCountry);
      finalHandle = `+${code}${localNumber}`;
    }

    if ((formData.preference === 'whatsapp' || formData.preference === 'telegram') && !finalHandle) {
      alert(`Please enter your ${formData.preference === 'whatsapp' ? 'WhatsApp Number' : 'Telegram Link'}!`);
      return;
    }

    const payload = {
      ...formData,
      contactHandle: finalHandle
    };

    try {
      const response = await postData('/contact/send', payload);
      if (response.success) {
        alert("Message securely sent to Database!");
        setFormData({ 
          name: '', 
          email: '', 
          preference: 'email',
          contactHandle: '', 
          subject: 'Free Technical Performance & SEO Audit',
          websiteUrl: '',
          message: ''
        });
      } else {
        alert("Server error: Message send nahi ho paya.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Backend server se connection fail ho gaya!");
    }
  };

  return (
    <div className="contact-container">
      <p className="contact-text text-center">
        Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <InputField type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <InputField type="email" name="email" placeholder="Your Email *" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="input-label">How should I reply to you? *</label>
          <select name="preference" value={formData.preference} onChange={handleChange} className="form-select" required aria-label="Contact Preference">
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        {formData.preference === 'whatsapp' && (
          <div className="form-group split-phone-wrapper">
            <label className="input-label">WhatsApp Number *</label>
            <div className="split-phone-container">
              <select 
                className="form-select country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label="Country Code"
              >
                {getCountries().map(country => (
                  <option key={country} value={country}>
                    {getFlagEmoji(country)} +{getCountryCallingCode(country)}
                  </option>
                ))}
              </select>
              <div className="local-number-input">
                <InputField
                  type="tel"
                  name="localNumber"
                  placeholder="Your Number *"
                  value={localNumber}
                  onChange={(e) => setLocalNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {formData.preference === 'telegram' && (
          <div className="form-group">
            <label className="input-label">Telegram Username / Link *</label>
            <InputField 
              type="text" 
              name="contactHandle" 
              placeholder="Your Telegram Link (t.me/...) *" 
              value={formData.contactHandle} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        <div className="form-group">
          <label className="input-label">Subject *</label>
          <select name="subject" value={formData.subject} onChange={handleChange} className="form-select" required aria-label="Subject">
            <option value="Free Technical Performance & SEO Audit">Free Technical Performance & SEO Audit</option>
            <option value="Free System Architecture & Automation Audit">Free System Architecture & Automation Audit</option>
            <option value="Free Sales Funnel, UX & Tracking Audit">Free Sales Funnel, UX & Tracking Audit</option>
            <option value="Website Rebuild & Tech Stack Modernization">Website Rebuild & Tech Stack Modernization</option>
            <option value="Enterprise Custom Web App (New Build)">Enterprise Custom Web App (New Build)</option>
            <option value="Complete Digital Infrastructure Overhaul (Full Transformation)">Complete Digital Infrastructure Overhaul (Full Transformation)</option>
          </select>
        </div>

        {formData.subject !== 'Enterprise Custom Web App (New Build)' && (
          <div className="form-group">
            <InputField 
              type="url" 
              name="websiteUrl" 
              placeholder="Website URL *" 
              value={formData.websiteUrl} 
              onChange={handleChange} 
              required
            />
          </div>
        )}

        <div className="form-group">
          <TextAreaField name="message" placeholder="Project Details *" rows="4" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn primary-btn" disabled={isWriting}>
          {isWriting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>

      <div className="direct-contact-divider">
        <p>Or reach out directly via</p>
        <div className="direct-links-group">
          <a
            href="#!"
            onClick={(e) => { e.preventDefault(); window.open("https://api.whatsapp.com/send?phone=918789047170", '_blank'); }}
            className="social-pill wa"
          >
            WhatsApp
          </a>
          <a href="mailto:disanalamofficial@gmail.com" className="social-pill email">Email</a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;