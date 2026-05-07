import React, { useState } from 'react';
import { useWrite } from '../../hooks/Write';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';

import PhoneInputPackage from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const PhoneInput = PhoneInputPackage.default || PhoneInputPackage;

const ContactForm = () => {
  const { postData, isWriting } = useWrite();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', preference: 'email'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.preference === 'whatsapp' && (!formData.phone || formData.phone.length < 5)) {
      alert("Please enter a valid phone number!");
      return;
    }

    try {
      const response = await postData('/contact/send', formData);
      if (response.success) {
        alert("Message securely sent to Database!");
        setFormData({ name: '', email: '', phone: '', message: '', preference: 'email' });
      } else {
        alert("Server error: Message send nahi ho paya.");
      }
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

        <div className="form-group preference-group">
          <label className="input-label">How should I reply to you? *</label>
          <div className="radio-options">
            <label className={`radio-btn ${formData.preference === 'email' ? 'active' : ''}`}>
              <input type="radio" name="preference" value="email" checked={formData.preference === 'email'} onChange={handleChange} />
              📧 Email
            </label>
            <label className={`radio-btn ${formData.preference === 'whatsapp' ? 'active' : ''}`}>
              <input type="radio" name="preference" value="whatsapp" checked={formData.preference === 'whatsapp'} onChange={handleChange} />
              💬 WhatsApp
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <InputField 
              type="email" 
              name="email" 
              placeholder={`Your Email ${formData.preference === 'email' ? '*' : '(Optional)'}`} 
              value={formData.email} 
              onChange={handleChange} 
              required={formData.preference === 'email'} 
            />
          </div>

          <div className="form-group custom-phone-input">
            <PhoneInput
              country={'in'}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              enableSearch={true}
              disableSearchIcon={true}
              inputProps={{ name: 'phone', required: formData.preference === 'whatsapp' }}
            />
          </div>
        </div>

        <div className="form-group">
          <TextAreaField name="message" placeholder="Your Message *" rows="4" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn primary-btn" disabled={isWriting}>
          {isWriting ? 'Sending...' : 'Send Message'}
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