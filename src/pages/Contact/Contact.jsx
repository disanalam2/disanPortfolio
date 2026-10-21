import React from 'react';
import { useAuth } from '../../context/authContext';
import PageLayout from '../../components/layout/PageLayout';
import ContactForm from './ContactForm';
import AdminInbox from './AdminInbox';
import SectionTitle from '../../components/ui/SectionTitle';
import SEO from '../../components/common/SEO';
import './Contact.scss';

const Contact = () => {
  const { isAdmin } = useAuth();

  const directContactElement = (
    <div className="header-direct-contact">
      <span className="direct-label">Or reach out directly via</span>
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
        <a href="mailto:disanalamofficial@gmail.com" className="social-pill email">
          Email
        </a>
      </div>
    </div>
  );

  return (
    <PageLayout className="contact-section">
      <SEO 
        title={isAdmin ? "Messages Inbox" : "Get In Touch"} 
        description="Hire Disan Alam for Custom Website Development, Speed Optimization, or Tech Stack Modernization. Contact now for a free technical SEO and performance audit." 
        url="contact"
      />
      <SectionTitle 
        title={isAdmin ? "Messages Inbox" : "Get In Touch"} 
        subtitle="Have a question or want to collaborate? Leave your details below and I'll get back to you promptly."
        rightElement={!isAdmin ? directContactElement : null}
      />
      
      {/* Agar Admin hai toh Inbox dikhao, warna Public Contact Form */}
      {isAdmin ? <AdminInbox /> : <ContactForm />}
    </PageLayout>
  );
};

export default Contact;