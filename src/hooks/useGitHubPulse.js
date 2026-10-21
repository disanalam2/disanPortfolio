import { useState, useEffect } from 'react';
import { BASE_URL } from '../services/api';

const GITHUB_USERNAME = 'disanalam2';
const SESSION_CACHE_KEY = `session_github_pulse_${GITHUB_USERNAME}`;

const DEFAULT_METRICS = {
  repos: 11,
  prs: 0,
  contributions: 246,
  commits: '204+',
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
  isLive: false,
  isPrivateIncluded: false,
};

/**
 * useGitHubPulse — Comprehensive GitHub Live Telemetry
 * 
 * Clean 2-Tier Strategy:
 * 1. Primary: Backend /api/github-stats endpoint (Secure server-side GITHUB_TOKEN for public + private telemetry)
 * 2. Fallback: Public GitHub REST APIs (Zero token needed, gracefully degrades if backend is offline)
 * 3. SessionStorage Caching: Instant 0ms reloads with zero layout shift
 */
export const useGitHubPulse = () => {
  const [metrics, setMetrics] = useState(() => {
    try {
      const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {}
    return DEFAULT_METRICS;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchTelemetry = async () => {
      // -------------------------------------------------------------
      // Strategy 1: Backend /api/github-stats (Secure Server-Side Token from backend .env)
      // -------------------------------------------------------------
      try {
        let backendRes = await fetch(`${BASE_URL}/github-stats`).catch(() => null);
        if (!backendRes || !backendRes.ok) {
          backendRes = await fetch('http://localhost:5000/api/github-stats').catch(() => null);
        }
        if (backendRes && backendRes.ok) {
          const backendData = await backendRes.json();
          if (backendData.success && backendData.repos !== undefined) {
            const data = {
              repos: backendData.repos,
              prs: backendData.prs,
              contributions: backendData.contributions,
              commits: backendData.commits,
              profileUrl: `https://github.com/${GITHUB_USERNAME}`,
              isLive: true,
              isPrivateIncluded: true,
            };
            if (isMounted) {
              setMetrics(data);
              try { sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data)); } catch {}
            }
            return;
          }
        }
      } catch {}

      // -------------------------------------------------------------
      // Strategy 2: Graceful Fallback to Public GitHub REST APIs (No Token Needed)
      // -------------------------------------------------------------
      try {
        const [userRes, prRes, contribRes, commitRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.json()),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`).then(r => r.json()),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`).then(r => r.json()),
          fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, {
            headers: { 'Accept': 'application/vnd.github.cloak-preview' }
          }).then(r => r.json())
        ]);

        const repos = userRes.status === 'fulfilled' && userRes.value?.public_repos !== undefined 
          ? userRes.value.public_repos 
          : DEFAULT_METRICS.repos;

        const prs = prRes.status === 'fulfilled' && prRes.value?.total_count !== undefined 
          ? prRes.value.total_count 
          : DEFAULT_METRICS.prs;

        const contributions = contribRes.status === 'fulfilled' && contribRes.value?.total?.lastYear !== undefined 
          ? contribRes.value.total.lastYear 
          : DEFAULT_METRICS.contributions;

        let commits = DEFAULT_METRICS.commits;
        if (commitRes.status === 'fulfilled' && commitRes.value?.total_count !== undefined && commitRes.value.total_count > 0) {
          commits = `${commitRes.value.total_count}+`;
        }

        const data = {
          repos,
          prs,
          contributions,
          commits,
          profileUrl: `https://github.com/${GITHUB_USERNAME}`,
          isLive: true,
          isPrivateIncluded: false,
        };

        if (isMounted) {
          setMetrics(data);
          try { sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data)); } catch {}
        }
      } catch {
        if (isMounted) {
          setMetrics(prev => ({ ...prev, isLive: false }));
        }
      }
    };

    fetchTelemetry();

    return () => {
      isMounted = false;
    };
  }, []);

  return metrics;
};
