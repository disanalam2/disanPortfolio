import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ServicesPricing from './ServicesPricing';
import { useLiveTelemetry } from '../../hooks/useLiveTelemetry';
import { useGitHubPulse } from '../../hooks/useGitHubPulse';

const AboutView = ({ aboutData = {}, experienceData = [], projectsData = [], skillsData = [], box3Config = {} }) => {
  // Real-time in-browser Core Web Vitals telemetry
  const telemetry = useLiveTelemetry();

  // Real-time GitHub Activity & Repo Telemetry
  const github = useGitHubPulse();

  // 1. Current / Present Work from Experience Section
  const currentWork = Array.isArray(experienceData) && experienceData.length > 0
    ? experienceData.find(exp => exp.period && exp.period.toLowerCase().includes('present')) || experienceData[0]
    : { role: "Web Developer", company: "GDG on Campus, HIT" };

  // 2. Previous / Ex-Companies from Experience Section
  const exCompanies = Array.isArray(experienceData) && experienceData.length > 0
    ? experienceData.filter(exp => exp.id !== currentWork?.id)
    : [];

  // 3. Live Projects count from Projects Section
  const liveProjectsCount = Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData.length
    : 6;

  // 4. Core Tech Stack for Box 3
  const coreStack = [
    { name: "Next.js", highlight: true },
    { name: "Node.js", highlight: true },
    { name: "React.js", highlight: false },
    { name: "Python", highlight: false },
    { name: "REST & Sockets", highlight: true },
    { name: "AWS / Docker", highlight: false },
    { name: "Agentic AI", highlight: true },
    { name: "MongoDB", highlight: false },
  ];

  // Calculate total production skills count if skillsData is available
  const totalSkillsCount = Array.isArray(skillsData) && skillsData.length > 0
    ? skillsData.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)
    : 28;

  return (
    <div className="about-view-wrapper">
      {/* Top Hero Section: Left Bio Card + Right Normal Photo */}
      <div className="about-hero-row">
        <Card className="about-bio-card">
          <p className="bio-lead-text">
            {aboutData.shortDesc || "I build resilient backend ecosystems and embed Agentic AI into production. I don't confuse exposure with expertise—I ship scalable code."}
          </p>

          <div className="action-buttons">
            <Button to="/projects" variant="primary">View My Work</Button>
            <Button to="/contact" variant="secondary">Contact Me</Button>
          </div>
        </Card>

        <div className="about-photo-card">
          <div className="photo-inner-circle">
            <img 
              src={aboutData.photo || "/disan-alam.webp"} 
              alt="Disan Alam - Full Stack Developer & Cybersecurity Student" 
              width="240"
              height="240"
              decoding="async" 
              fetchpriority="high" 
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars Below: Who I am, What I do, How I work */}
      <div className="about-pillars-grid">
        <Card className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-dot" />
            <h4 className="pillar-title">Who I am</h4>
          </div>
          <p className="pillar-text">
            {aboutData.whoIAm || "I am an engineer driven by system performance and architectural integrity. Whether serving as a Full-Stack & Agentic AI Developer Intern at an early-stage HealthTech startup or leading Web Development at GDG, my priority is clear: optimizing server loads, minimizing WebSocket latency, and engineering databases that scale indefinitely."}
          </p>
        </Card>

        <Card className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-dot" />
            <h4 className="pillar-title">What I do</h4>
          </div>
          <p className="pillar-text">
            {aboutData.whatIDo || "I architect solutions for complex bottlenecks. I am currently building an Agentic AI Clinical Scriber (Next.js, GenAI, AWS), engineering real-time Email Automation pipelines (Socket.io), and designing the modular backend architecture for a massive GDG Management Portal using advanced MongoDB aggregations."}
          </p>
        </Card>

        <Card className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-dot" />
            <h4 className="pillar-title">How I work</h4>
          </div>
          <p className="pillar-text">
            {aboutData.howIWork || "I execute with relentless precision. My mastery of Next.js and Node.js is backed by hardcore fundamentals in Python, C, and Java. From deep-dive data analytics with Pandas to full-stack cloud deployments, my goal is singular: ship robust software, solve real problems, and let the output speak for itself."}
          </p>
        </Card>
      </div>

      {/* 4 Cards Directly Below 3 Pillars */}
      <div className="about-quad-grid">
        {/* Box 1: Present Work & Project Velocity */}
        <Card className="quad-card quad-work-card">
          <div className="quad-card-top">
            <div className="present-work-row">
              <span className="live-status-dot" title="Actively Working" />
              <div className="present-role-company">
                <span className="work-role">{currentWork.role}</span>
                <span className="work-dash">-</span>
                <span className="work-company">{currentWork.company}</span>
              </div>
            </div>

            {exCompanies.length > 0 && (
              <div className="ex-companies-group">
                {exCompanies.map((exp, idx) => (
                  <div key={idx} className="ex-company-row">
                    <span className="ex-tag">Ex -</span>
                    <span className="ex-name">{exp.company}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="quad-card-bottom">
            <div className="live-projects-indicator">
              <span className="project-num">{liveProjectsCount}</span>
              <span className="project-text">- Live Projects</span>
            </div>
          </div>
        </Card>

        {/* Box 2: Live System Telemetry (Core Web Vitals - Measured Live from Browser Engine) */}
        <Card className="quad-card quad-telemetry-card" title="Real-time Core Web Vitals measured directly in your browser via PerformanceObserver">
          <div className="telemetry-top-tag">
            <span className={`telemetry-pulse-dot ${telemetry.isLive ? 'live-active' : ''}`} />
            <span className="telemetry-label">SITE TELEMETRY (REAL-TIME BENCHMARK)</span>
            <span className="telemetry-live-pill">LIVE</span>
          </div>

          <div className="telemetry-metrics-grid">
            <div className="telemetry-metric-item">
              <span className="metric-score">{telemetry.lcp}</span>
              <span className="metric-abbr" title="Largest Contentful Paint (Real User LCP)">LCP</span>
            </div>
            <div className="metric-col-divider" />
            <div className="telemetry-metric-item">
              <span className="metric-score">{telemetry.inp}</span>
              <span className="metric-abbr" title="Interaction to Next Paint (Click/Input Latency)">INP</span>
            </div>
            <div className="metric-col-divider" />
            <div className="telemetry-metric-item">
              <span className="metric-score">{telemetry.cls}</span>
              <span className="metric-abbr" title="Cumulative Layout Shift (Visual Stability)">CLS</span>
            </div>
          </div>

          <div className="telemetry-bottom-subtext">
            <span className="subtext-icon">⚡</span>
            <span className="subtext-content">100% Performance Optimized Architecture</span>
          </div>
        </Card>

        {/* Box 3: Architectural Capabilities (Idea 2 - Manually Configurable via Admin) */}
        <Card className="quad-card quad-stack-card" title="Enterprise architecture capabilities and systems engineering">
          <div className="stack-top-tag">
            <span className="stack-status-dot" />
            <span className="stack-label">ARCHITECTURAL CAPABILITIES</span>
            <span className="stack-count-pill">SYSTEMS</span>
          </div>

          <div className="capabilities-tags">
            <span className="capability-tag">
              <span className="cap-icon">🤖</span>
              <span className="cap-text">{box3Config?.cap1 || 'Agentic AI Automation'}</span>
            </span>
            <span className="capability-tag">
              <span className="cap-icon">⚡</span>
              <span className="cap-text">{box3Config?.cap2 || 'Real-Time WebSocket Pipelines'}</span>
            </span>
            <span className="capability-tag">
              <span className="cap-icon">☁️</span>
              <span className="cap-text">{box3Config?.cap3 || 'Cloud-Native Microservices'}</span>
            </span>
            <span className="capability-tag">
              <span className="cap-icon">🛡️</span>
              <span className="cap-text">{box3Config?.cap4 || 'OWASP & API Security'}</span>
            </span>
          </div>

          <Link to="/skills" className="stack-bottom-subtext" title="View complete technology matrix">
            <span className="subtext-icon">⚡</span>
            <span className="subtext-content">{box3Config?.subtext || 'Zero-Downtime Distributed Systems'}</span>
          </Link>
        </Card>

        {/* Box 4: Live GitHub Telemetry */}
        <Card 
          className="quad-card quad-github-card" 
          title="Open GitHub profile @disanalam2 (Live Developer Metrics)"
          onClick={() => window.open(github.profileUrl, '_blank', 'noopener,noreferrer')}
        >
          <div className="github-top-tag">
            <span className={`github-pulse-dot ${github.isLive ? 'live-active' : ''}`} />
            <span className="github-label">LIVE GITHUB TELEMETRY</span>
            <span className="github-live-pill">{github.isPrivateIncluded ? 'PRIV+PUB' : 'LIVE'}</span>
          </div>

          <div className="github-metrics-grid">
            <div className="github-metric-item" title="Total Public + Private Repositories">
              <span className="metric-score">{github.repos}</span>
              <span className="metric-abbr">REPOS</span>
            </div>
            <div className="metric-col-divider" />
            <div className="github-metric-item" title="Total Contributions (Public + Private Restricted)">
              <span className="metric-score">{github.contributions}</span>
              <span className="metric-abbr">CONTRIBS</span>
            </div>
            <div className="metric-col-divider" />
            <div className="github-metric-item" title="Total Commits & Pushes (Public + Private)">
              <span className="metric-score">{github.commits}</span>
              <span className="metric-abbr">PUSHES</span>
            </div>
            <div className="metric-col-divider" />
            <div className="github-metric-item" title="All-Time PRs Raised & Merged (Public + Private)">
              <span className="metric-score">{github.prs}</span>
              <span className="metric-abbr">PRS</span>
            </div>
          </div>

          <a 
            href={github.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-bottom-subtext"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="subtext-icon">⚡</span>
            <span className="subtext-content">github.com/disanalam2 ↗</span>
          </a>
        </Card>
      </div>

      {/* Freelance Engineering Services & Starting Pricing in INR (₹) */}
      <ServicesPricing />
    </div>
  );
};

export default AboutView;