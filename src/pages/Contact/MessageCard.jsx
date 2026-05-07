import React from 'react';

const MessageCard = ({ msg }) => {
  return (
    <div className="message-card">
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
  );
};

export default MessageCard;