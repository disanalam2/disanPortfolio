import React, { useEffect, useState } from 'react';
import { apiCall } from '../../services/api';
import Loader from '../../components/common/Loader';
import MessageCard from './MessageCard';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await apiCall('/contact/inbox');
        
        // Safety checks: Backend Array bhej raha hai ya Object
        if (Array.isArray(data)) {
          setMessages(data);
        } else if (data && Array.isArray(data.data)) {
          setMessages(data.data);
        } else {
          console.error("Inbox format error:", data);
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <Loader message="Loading Messages..." />;

  return (
    <div className="admin-inbox-container">
      {messages.length === 0 ? (
        <p className="contact-text text-center">No messages received yet.</p>
      ) : (
        <div className="messages-grid">
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInbox;