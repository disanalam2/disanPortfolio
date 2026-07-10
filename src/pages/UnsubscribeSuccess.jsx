import React from 'react';
import { NavLink } from 'react-router-dom';

const UnsubscribeSuccess = () => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      color: '#e2e8f0'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#f8fafc' }}>
        You Have Been Unsubscribed
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem', color: '#94a3b8' }}>
        We're sorry to see you go! You have been successfully removed from our mailing list and will no longer receive automated follow-ups.
      </p>
      
      <NavLink 
        to="/" 
        style={{
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s'
        }}
      >
        Explore My Portfolio
      </NavLink>
    </div>
  );
};

export default UnsubscribeSuccess;
