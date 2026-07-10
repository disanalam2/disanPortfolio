import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Play, Pause } from 'lucide-react';
import { API_URL } from '../services/api';

const PitchView = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // Reference for the video bubble
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchLeadInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/leads/pitch/${uuid}`);
        setLead(res.data);
      } catch (err) {
        console.error("Could not fetch pitch info", err);
        setError("Pitch not found or has expired.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeadInfo();
  }, [uuid]);

  // The Magic TTS Logic
  const startPitch = () => {
    if (!lead) return;
    
    setIsPlaying(true);
    setShowVideo(true);
    
    // 1. Text-To-Speech (Native Browser AI)
    const utterance = new SpeechSynthesisUtterance(`Hi ${lead.business_name} team, I was reviewing your digital presence online and noticed a few critical areas where you are losing customers. Please take a look at the screen.`);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    
    // Play the video right after the intro name-drop
    utterance.onend = () => {
      if (videoRef.current) {
         videoRef.current.play();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopPitch = () => {
    setIsPlaying(false);
    window.speechSynthesis.cancel();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
        <h2>Loading your personalized audit...</h2>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000', 
      position: 'relative', 
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Background Layer: Their actual website screenshot! */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: `url(${lead.screenshot_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        opacity: isPlaying ? 1 : 0.4,
        transition: 'opacity 1s ease',
        filter: isPlaying ? 'none' : 'blur(5px)'
      }} />

      {/* Intro Overlay if not playing */}
      {!isPlaying && !showVideo && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #374151',
          textAlign: 'center',
          maxWidth: '600px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '16px', fontWeight: '800' }}>
            Video Audit for <span style={{ color: '#60a5fa' }}>{lead.business_name}</span>
          </h1>
          <p style={{ color: '#9ca3af', marginBottom: '32px', fontSize: '1.1rem' }}>
            I found a few critical bottlenecks that are causing you to lose customers online. Click play to see the exact issues on your screen.
          </p>
          <button 
            onClick={startPitch}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '16px',
              backgroundColor: '#3b82f6', color: '#fff',
              border: 'none', borderRadius: '8px',
              fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.5)'
            }}
          >
            <Play size={24} /> Play Video Audit
          </button>
        </div>
      )}

      {/* The Fake Loom Bubble */}
      {showVideo && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #3b82f6',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 10,
          backgroundColor: '#000',
          animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Generic Pitch Video placeholder (In production, put an actual generic mp4 of you talking here) */}
          <video 
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted={false}
          />
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes popIn {
              0% { transform: scale(0); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}} />
          
          {/* Pause Overlay */}
          <div 
            onClick={isPlaying ? stopPitch : startPitch}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)', cursor: 'pointer',
              opacity: 0, transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
            onMouseOut={(e) => e.currentTarget.style.opacity = 0}
          >
            {isPlaying ? <Pause color="white" size={40} /> : <Play color="white" size={40} />}
          </div>
        </div>
      )}

      {/* Floating CTA Top Right */}
      {showVideo && (
        <div style={{
          position: 'absolute',
          top: '30px', right: '30px',
          display: 'flex', gap: '15px'
        }}>
          <button 
            onClick={() => navigate('/contact')}
            style={{
              padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px',
              fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            Fix My Website
          </button>
        </div>
      )}
    </div>
  );
};

export default PitchView;
