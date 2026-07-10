import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import { API_URL } from '../services/api';

const ProposalPitch = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/track/proposal-info/${uuid}`);
        setLead(res.data);
      } catch (err) {
        console.error("Could not fetch lead info", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeadInfo();
  }, [uuid, API_URL]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
        <h2>Loading your personalized experience...</h2>
      </div>
    );
  }

  const businessName = lead?.business_name || "Guest";
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      {/* Dynamic VIP Greeting Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid #1f2937' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome, {businessName}
        </h1>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem', color: '#9ca3af', maxWidth: '600px', margin: '1rem auto 0' }}>
          We've prepared a custom digital growth strategy tailored specifically for your business.
        </p>
      </motion.div>

      {/* Value Proposition Section */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {/* Card 1 */}
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '1rem', border: '1px solid #374151' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#60a5fa', marginBottom: '1rem' }}>Modern Web Infrastructure</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Your digital storefront is your most critical asset. We build high-performance, SEO-optimized web applications designed to convert visitors into loyal customers.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '1rem', border: '1px solid #374151' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#c084fc', marginBottom: '1rem' }}>Revenue Optimization</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Stop losing customers to outdated interfaces. We implement streamlined online booking, ordering, and lead capture systems that directly impact your bottom line.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready to elevate {businessName}?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/contact')}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)' }}
            >
              Let's Talk Strategy
            </button>
            <button 
              onClick={() => navigate('/')}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: 'transparent', color: '#d1d5db', border: '1px solid #4b5563', borderRadius: '0.5rem', cursor: 'pointer' }}
            >
              View Full Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProposalPitch;
