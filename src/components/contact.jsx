import React, { useState } from 'react';
import '../styles/contact.scss';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Track which button the user clicked (whatsapp or email)
  const [submitMethod, setSubmitMethod] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitMethod === 'whatsapp') {
      // --- WHATSAPP LOGIC ---
      const phoneNumber = "918789047170"; 
      
      const whatsappText = `Hello! You have a new message from your website:
      
*Name:* ${formData.name}
*Email:* ${formData.email}
*Message:* ${formData.message}`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');

    } else if (submitMethod === 'email') {
      // --- EMAIL LOGIC ---
      const myEmailAddress = "disanalamofficial@gmail.com"; 
      const emailSubject = `New Website Message from ${formData.name}`;
      const emailBody = `Hello,

You have received a new message from your website contact form:

Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;

      const mailtoUrl = `mailto:${myEmailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // window.location.href triggers the browser to open the default mail client
      window.location.href = mailtoUrl;
    }
  };

  return (
    <motion.section
      className="contact-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <p className="contact-text">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {/* Dual Buttons */}
          <div className="button-group">
            <button 
              type="submit" 
              className="submit-btn whatsapp-btn" 
              onClick={() => setSubmitMethod('whatsapp')}
            >
              Send via WhatsApp
            </button>
            <button 
              type="submit" 
              className="submit-btn email-btn" 
              onClick={() => setSubmitMethod('email')}
            >
              Send via Email
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;