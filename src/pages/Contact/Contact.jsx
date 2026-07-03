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
        title={isAdmin ? "Admin Inbox" : "Contact Me"} 
        description="Get in touch with Disan Alam for web development opportunities, freelance projects, or just to say hi." 
        url="contact"
      />
      <SectionTitle title={isAdmin ? "Messages Inbox" : "Get In Touch"} />
      
      {/* Agar Admin hai toh Inbox dikhao, warna Public Contact Form */}
      {isAdmin ? <AdminInbox /> : <ContactForm />}
    </PageLayout>
  );
};

export default Contact;