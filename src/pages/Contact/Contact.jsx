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

  return (
    <PageLayout className="contact-section">
      <SEO 
        title={isAdmin ? "Admin Inbox" : "Contact Me | Disan Alam"} 
        description="Hire Disan Alam for Custom Website Development, Speed Optimization, or Tech Stack Modernization. Contact now for a free technical SEO and performance audit." 
        url="contact"
      />
      <SectionTitle title={isAdmin ? "Messages Inbox" : "Get In Touch"} />
      
      {/* Agar Admin hai toh Inbox dikhao, warna Public Contact Form */}
      {isAdmin ? <AdminInbox /> : <ContactForm />}
    </PageLayout>
  );
};

export default Contact;