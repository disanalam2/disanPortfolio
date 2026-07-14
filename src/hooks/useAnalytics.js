import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../services/api';

const generateSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track in production or if you want to track locally, you can remove the check
    // if (process.env.NODE_ENV !== 'production') return;

    const trackPageView = async () => {
      try {
        await axios.post(`${BASE_URL}/web-analytics/track`, {
          page_path: location.pathname + location.search,
          referrer: document.referrer,
          session_id: generateSessionId(),
          device_type: getDeviceType()
        });
      } catch (error) {
        // Silently fail if tracking fails, to not disrupt user experience
        console.error('Analytics tracking failed:', error);
      }
    };

    // Slight delay to ensure page is fully loaded before tracking
    const timeoutId = setTimeout(trackPageView, 500);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]);
};
