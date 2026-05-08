import React from 'react';
import { useAuth } from '../../context/authContext';
import PageLayout from '../../components/layout/PageLayout';
import ContactForm from './ContactForm';
import AdminInbox from './AdminInbox';
import './Contact.scss';

const Contact = () => {
  const { isAdmin } = useAuth();

  return (
    <PageLayout className="contact-section">
      <h2 className="section-title">
        {isAdmin ? "Messages Inbox" : "Get In Touch"}
      </h2>
      
      {/* Agar Admin hai toh Inbox dikhao, warna Public Contact Form */}
      {isAdmin ? <AdminInbox /> : <ContactForm />}
    </PageLayout>
  );
};

export default Contact;