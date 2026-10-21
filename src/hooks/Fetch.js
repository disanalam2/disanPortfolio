import { useState, useEffect } from 'react';
import { apiCall } from '../services/api';
import { useRefresh } from '../context/RefreshContext';

// Default static seed cache for instant (0ms) First Paint without waiting for network
const SEED_CACHE = {
  '/about': {
    title: 'AI Systems Architect & Full-Stack Engineer',
    shortDesc: "I build resilient backend ecosystems and embed Agentic AI into production. I don't confuse exposure with expertise—I ship scalable code.",
    photo: '/disan-alam.webp',
    whoIAm: 'I am an engineer driven by system performance and architectural integrity. Whether serving as a Full-Stack & Agentic AI Developer Intern at an early-stage HealthTech startup or leading Web Development at GDG, my priority is clear: optimizing server loads, minimizing WebSocket latency, and engineering databases that scale indefinitely.',
    whatIDo: 'I architect solutions for complex bottlenecks. I am currently building an Agentic AI Clinical Scriber (Next.js, GenAI, AWS), engineering real-time Email Automation pipelines (Socket.io), and designing the modular backend architecture for a massive GDG Management Portal using advanced MongoDB aggregations.',
    howIWork: 'I execute with relentless precision. My mastery of Next.js and Node.js is backed by hardcore fundamentals in Python, C, and Java. From deep-dive data analytics with Pandas to full-stack cloud deployments, my goal is singular: ship robust software, solve real problems, and let the output speak for itself.',
  },
  '/experience': [
    {
      id: 1,
      role: 'Web Developer',
      company: 'GDG on Campus, Haldia Institute of Technology',
      period: 'April 2026 - Present',
      details: [
        'Location: Haldia, India',
        'Engineered custom Project Hub from scratch for agile workflows across the entire engineering unit.',
      ],
    },
  ],
  '/skills': [
    { id: 1, category: "Languages", skills: ["JavaScript (ES6+)", "Python", "Java", "SQL", "C", "C++"] },
    { id: 2, category: "Frontend", skills: ["React.js", "HTML5 / CSS3", "Tailwind CSS", "Sass (SCSS)", "Vite", "Next.js"] },
    { id: 3, category: "Backend & Database", skills: ["Node.js", "Express.js", "RESTful APIs", "MySQL", "SQLite", "Prisma"] },
    { id: 4, category: "Tools & Cloud", skills: ["Git / GitHub", "Docker / Compose", "Firebase", "Postman", "AWS"] },
    { id: 5, category: "AI & Automation", skills: ["Google Gemini AI", "Agentic AI", "IMAP Scraping", "Cron Jobs"] },
  ],
  '/projects': [
    { id: 9, title: "GDG Agile Project Management Hub" },
    { id: 8, title: "Agentic AI Clinical Scriber" },
    { id: 7, title: "Smart Healthcare Platform" },
    { id: 6, title: "Automated Email Pipeline" },
    { id: 5, title: "Real-time Chat & Collaboration" },
    { id: 4, title: "Enterprise Resource Management" },
  ],
};

const memoryCache = new Map();

/**
 * Non-blocking background persistence helper.
 * Serializes and writes to localStorage when the browser event loop is idle,
 * preventing any main-thread UI frame drops or INP degradation.
 */
const deferLocalStorageSave = (key, value) => {
  const persist = () => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota exceeded or private browsing mode, safely ignore
    }
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(persist, { timeout: 2000 });
  } else {
    setTimeout(persist, 0);
  }
};

/**
 * High-Performance SWR (Stale-While-Revalidate) useFetch Hook
 * Provides instant 0ms rendering from Memory / LocalStorage / Seed cache,
 * then silently syncs in the background with zero layout shift.
 */
export const useFetch = (endpoint, initialData = null) => {
  const getInitialData = () => {
    if (!endpoint) return initialData;
    if (memoryCache.has(endpoint)) return memoryCache.get(endpoint);
    try {
      const stored = localStorage.getItem(`swr_${endpoint}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        memoryCache.set(endpoint, parsed);
        return parsed;
      }
    } catch {}
    if (SEED_CACHE[endpoint]) {
      return SEED_CACHE[endpoint];
    }
    return initialData;
  };

  const initialCached = getInitialData();
  const [data, setData] = useState(initialCached);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(null);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    if (!endpoint) return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!memoryCache.has(endpoint) && !SEED_CACHE[endpoint]) {
          setLoading(true);
        }
        const result = await apiCall(endpoint);
        if (isMounted && result) {
          memoryCache.set(endpoint, result);
          deferLocalStorageSave(`swr_${endpoint}`, result);
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, refreshKey]);

  return { data, setData, loading, error };
};
