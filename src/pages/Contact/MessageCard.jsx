import React, { useState } from 'react';
import { useWrite } from '../../hooks/Write';

const MessageCard = ({ msg, onDeleted }) => {
  const { deleteData, isWriting } = useWrite();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Kya aap is message ko delete karna chahte hain? ⚠️')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteData(`/contact/delete/${msg.id}`);
      alert('Message successfully deleted! ✅');
      if (onDeleted) onDeleted(msg.id);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete message. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="message-card">
      <div className="msg-header">
        <h4>{msg.name}</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className="msg-date">
            {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Just now'}
          </span>
          <button
            onClick={handleDelete}
            disabled={isWriting || isDeleting}
            style={{
              background: '#ef4444',
              color: "var(--text-primary)",
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: isWriting || isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              opacity: isWriting || isDeleting ? 0.6 : 1,
            }}
            title="Delete this message"
          >
            {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete'}
          </button>
        </div>
      </div>

      <div className="msg-contact-info">
        <span className={`pref-badge ${msg.preference}`}>Prefers: {msg.preference}</span>
        {msg.email && <a href={`mailto:${msg.email}`} className="msg-link">📧 {msg.email}</a>}
        {msg.phone && msg.preference === 'whatsapp' && (
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://api.whatsapp.com/send?phone=${msg.phone}`, '_blank');
            }}
            className="msg-link"
          >
            💬 +{msg.phone}
          </a>
        )}
        {msg.phone && msg.preference === 'telegram' && (
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://t.me/${msg.phone.replace('@', '')}`, '_blank');
            }}
            className="msg-link"
          >
            ✈️ {msg.phone.startsWith('@') ? msg.phone : `@${msg.phone}`}
          </a>
        )}
      </div>

      {(msg.subject || msg.websiteUrl) && (
        <div style={{ marginTop: '15px', padding: '12px', background: 'var(--glass-bg)', borderLeft: '3px solid var(--accent-color)', borderRadius: '0 8px 8px 0' }}>
          {msg.subject && (
            <div style={{ marginBottom: msg.websiteUrl ? '8px' : '0', fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Project Type:</strong> <span style={{ color: 'var(--text-primary)' }}>{msg.subject}</span>
            </div>
          )}
          {msg.websiteUrl && (
            <div style={{ fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Website URL:</strong>{' '}
              <a href={msg.websiteUrl.startsWith('http') ? msg.websiteUrl : `https://${msg.websiteUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                {msg.websiteUrl}
              </a>
            </div>
          )}
        </div>
      )}

      <p className="msg-body">{msg.message}</p>
    </div>
  );
};

export default MessageCard;