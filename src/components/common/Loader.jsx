import React from 'react';

const Loader = ({ message = "Loading data..." }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="spinner" style={{
        width: '45px',
        height: '45px',
        border: '3px solid rgba(0, 242, 254, 0.1)',
        borderTop: '3px solid var(--accent-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '1.2rem', fontWeight: '500', fontSize: '0.95rem' }}>{message}</p>
      
      {/* Inline keyframes taaki alag se css na likhna pade loader ke liye */}
      <style>{`
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
};

export default Loader;