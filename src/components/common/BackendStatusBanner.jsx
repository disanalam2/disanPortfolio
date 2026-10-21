import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackendStatusBanner = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Custom event listener for native fetch (dispatched in api.js) and browser network state
    const handleOfflineEvent = () => setIsOffline(true);
    const handleOnlineEvent = () => setIsOffline(false);

    window.addEventListener('backend-offline', handleOfflineEvent);
    window.addEventListener('online', handleOnlineEvent);
    window.addEventListener('offline', handleOfflineEvent);

    return () => {
      window.removeEventListener('backend-offline', handleOfflineEvent);
      window.removeEventListener('online', handleOnlineEvent);
      window.removeEventListener('offline', handleOfflineEvent);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            zIndex: 999999, // Ensure it covers everything
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255, 59, 48, 0.1)',
              border: '1px solid rgba(255, 59, 48, 0.3)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '600px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ marginBottom: '20px', color: '#FF3B30' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 600 }}>Service Temporarily Unavailable</h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '30px' }}>
              Backend services are temporarily shut down due to an emergency or routine maintenance. 
              Please check back shortly. We apologize for the inconvenience.
            </p>
            <button 
              onClick={() => setIsOffline(false)}
              style={{
                background: '#FF3B30',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#d93025'}
              onMouseOut={(e) => e.currentTarget.style.background = '#FF3B30'}
            >
              Close & Browse Offline
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackendStatusBanner;
