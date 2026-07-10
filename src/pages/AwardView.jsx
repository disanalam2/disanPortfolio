import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Award, Star, Trophy, ExternalLink, ArrowRight } from 'lucide-react';
import { API_URL } from '../services/api';

const AwardView = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/leads/pitch/${uuid}`);
        setLead(res.data);
      } catch (err) {
        console.error("Could not fetch award info", err);
        setError("This award page has expired or could not be found.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeadInfo();
  }, [uuid]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', color: '#fff' }}>
        <h2>Loading Award Features...</h2>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', color: '#fff' }}>
        <h2>{error}</h2>
      </div>
    );
  }

  const queryParams = new URLSearchParams(location.search);
  const isPreview = queryParams.get('preview') === 'true';

  if (!lead.is_award_public && !isPreview) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <Trophy size={64} color="#4b5563" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Award Pending Verification</h2>
        <p style={{ color: '#9ca3af', maxWidth: '500px' }}>
          This business has been nominated for the Top 10 list, but the award is currently undergoing editorial review and has not yet been published publicly.
        </p>
      </div>
    );
  }

  const nicheName = (lead.niche || 'Business').toUpperCase();
  const city = lead.address ? lead.address.split(',').pop().trim() : 'the City';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Banner */}
      <div style={{ 
        padding: '6rem 2rem 4rem', 
        textAlign: 'center', 
        background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, rgba(5,5,5,1) 100%)',
        borderBottom: '1px solid #1f2937'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Trophy size={64} color="#fbbf24" />
        </div>
        <h3 style={{ color: '#fbbf24', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '10px' }}>
          TOP 10 RATED {nicheName}S IN {city.toUpperCase()}
        </h3>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1rem', color: '#fff' }}>
          {lead.business_name}
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Recognized for outstanding customer service, premium local reputation, and excellence in the {nicheName} industry.
        </p>
      </div>

      {/* Ranks & Features */}
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
        
        <div style={{ 
          backgroundColor: '#111827', 
          borderRadius: '16px', 
          padding: '30px', 
          border: '1px solid #374151',
          display: 'flex', 
          alignItems: 'center', 
          gap: '30px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: 'bold', flexShrink: 0
          }}>
            #1
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{lead.business_name}</h2>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />)}
            </div>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Selected as the top performing {nicheName} based on customer reviews, area impact, and operational excellence.
            </p>
          </div>
        </div>

        {/* The Pitch (Inception) */}
        <div style={{ marginTop: '4rem', padding: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '0 16px 16px 0' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#60a5fa', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} /> Editor's Note: Digital Presence Warning
          </h3>
          <p style={{ color: '#d1d5db', lineHeight: '1.7', marginBottom: '20px' }}>
            While <strong>{lead.business_name}</strong> dominates the local offline market, we noticed they currently do not have an official website for online bookings/orders. In today's digital age, relying solely on third-party apps or phone calls leads to missed opportunities.
          </p>
          
          <button 
            onClick={() => navigate('/contact')}
            style={{
              padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px',
              fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.2s'
            }}
          >
            Claim & Build Official Website <ArrowRight size={18} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default AwardView;
