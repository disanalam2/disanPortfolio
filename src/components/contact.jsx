import React, { useState, useEffect } from 'react';
import '../styles/contact.scss';
import { motion } from 'framer-motion';

import PhoneInputPackage from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const PhoneInput = PhoneInputPackage.default || PhoneInputPackage;

const Contact = ({ isAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preference: 'email'
  });

  const [inboxMessages, setInboxMessages] = useState([]);

 // Jab bhi Admin login karega, Database se messages fetch honge
  useEffect(() => {
    if (isAdmin) {
      const fetchMessages = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/contact/inbox', {
            // YAHAN HEADER ADD KAREIN (Ye miss ho gaya tha)
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          
          const data = await response.json();
          
          // SAFETY CHECK: Ensure data ek array hai tabhi state update karo
          if (Array.isArray(data)) {
            setInboxMessages(data);
          } else {
            console.error("Backend did not return an array:", data);
            setInboxMessages([]); // Crash se bachane ke liye empty array set kar do
          }
          
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };
      
      fetchMessages();
    }
  }, [isAdmin]);

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
      // Yahan route bilkul sahi hai: /send aur IP: 127.0.0.1
      const response = await fetch('http://127.0.0.1:5000/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Message securely sent to Database!");
        setFormData({ name: '', email: '', phone: '', message: '', preference: 'email' });
      } else {
        alert("Server error: Message send nahi ho paya.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend server se connection fail ho gaya!");
    }
  };

  if (isAdmin) {
    return (
      <motion.section className="contact-section container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="section-title">Messages Inbox</h2>
        <div className="admin-inbox-container">
          {inboxMessages.length === 0 ? (
            <p className="contact-text text-center">No messages received yet.</p>
          ) : (
            <div className="messages-grid">
              {inboxMessages.map(msg => (
                <div key={msg.id} className="message-card">
                  <div className="msg-header">
                    <h4>{msg.name}</h4>
                    <span className="msg-date">
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Just now'}
                    </span>
                  </div>

                  <div className="msg-contact-info">
                    <span className={`pref-badge ${msg.preference}`}>Prefers: {msg.preference}</span>
                    {msg.email && <a href={`mailto:${msg.email}`} className="msg-link">📧 {msg.email}</a>}
                    {msg.phone && (
                      <a
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`https://api.whatsapp.com/send?phone=${msg.phone}`, '_blank');
                        }}
                        className="msg-link"
                      >
                        📱 +{msg.phone}
                      </a>
                    )}
                  </div>

                  <p className="msg-body">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section className="contact-section container" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <p className="contact-text text-center">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} required />
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
              <input
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
                inputProps={{
                  name: 'phone',
                  required: formData.preference === 'whatsapp',
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <textarea name="message" placeholder="Your Message *" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="submit-btn primary-btn">Send Message</button>
        </form>

        <div className="direct-contact-divider">
          <p>Or reach out directly via</p>
          <div className="direct-links-group">
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://api.whatsapp.com/send?phone=918789047170", '_blank');
              }}
              className="social-pill wa"
            >
              WhatsApp
            </a>
            <a href="mailto:disanalamofficial@gmail.com" className="social-pill email">Email</a>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Contact;