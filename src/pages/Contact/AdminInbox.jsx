import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/Fetch';
import { useRefresh } from '../../context/RefreshContext';
import Loader from '../../components/common/Loader';
import MessageCard from './MessageCard';
import socket from '../../services/socket';

const AdminInbox = () => {
  const { data: messages, loading, error, setData } = useFetch('/contact/inbox', []);
  const { triggerRefresh } = useRefresh();

  // Listen for real-time updates
  useEffect(() => {
    const handleNewContact = () => {
      triggerRefresh();
    };

    const handleDeleteContact = () => {
      triggerRefresh();
    };

    socket.on('newContact', handleNewContact);
    socket.on('deleteContact', handleDeleteContact);

    return () => {
      socket.off('newContact', handleNewContact);
      socket.off('deleteContact', handleDeleteContact);
    };
  }, [triggerRefresh]);

  // Handle message deletion from local state
  const handleMessageDeleted = (messageId) => {
    setData(prevMessages => {
      if (Array.isArray(prevMessages)) {
        return prevMessages.filter(msg => msg.id !== messageId);
      }
      return prevMessages;
    });
  };

  if (loading) return <Loader message="Loading Messages..." />;

  // Handle array response directly
  const messageList = Array.isArray(messages) ? messages : (messages?.data && Array.isArray(messages.data) ? messages.data : []);

  if (error) {
    return (
      <div className="admin-inbox-container">
        <p className="contact-text text-center" style={{ color: '#ef4444' }}>
          Failed to load messages. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-inbox-container">
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px', textAlign: 'center' }}>
        📡 Real-time sync enabled | Total messages: {messageList.length}
      </div>
      
      {messageList.length === 0 ? (
        <p className="contact-text text-center">No messages received yet.</p>
      ) : (
        <div className="messages-grid">
          {messageList.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onDeleted={handleMessageDeleted} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInbox;