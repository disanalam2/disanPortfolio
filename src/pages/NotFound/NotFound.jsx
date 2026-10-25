import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';
import './NotFound.scss';

const NotFound = () => {
  const location = useLocation();

  return (
    <PageLayout className="notfound-page">
      <SEO 
        title="404: Route Not Found | Disan Alam"
        description="The requested endpoint does not exist on Disan Alam's systems architecture portfolio. Return to home or explore engineering services."
        url="https://www.disanalam.me/404"
        robots="noindex, nofollow"
      />

      <div className="notfound-card">
        {/* HUD Status Pill */}
        <div className="notfound-badge">
          <span className="error-dot" aria-hidden="true" />
          <span>ERR_404 // CLUSTER_NODE_NOT_FOUND</span>
        </div>

        {/* 404 Glitch Title */}
        <h1 className="notfound-code" data-text="404">404</h1>

        <h2 className="notfound-heading">Lost in the Neural Matrix?</h2>
        
        <p className="notfound-subtext">
          The requested endpoint <code className="target-path">{location.pathname}</code> does not exist on this server cluster or has been decommissioned during an architectural refactor. All system telemetries remain intact.
        </p>

        {/* Telemetry Diagnostics HUD */}
        <div className="notfound-diagnostics">
          <div className="diag-header">
            <span className="diag-icon" aria-hidden="true">⚡</span>
            <span>DIAGNOSTIC LOG (ROUTING DISPATCHER)</span>
          </div>
          <div className="diag-body">
            <div><span className="diag-key">REQUESTED_URI:</span> <span className="diag-val">{location.pathname}</span></div>
            <div><span className="diag-key">SYSTEM_STATUS:</span> <span className="diag-val status-err">UNRESOLVED_DISPATCH</span></div>
            <div><span className="diag-key">ROUTER_CORE:</span> <span className="diag-val">REACT_V19_VITE_V8</span></div>
            <div><span className="diag-key">RECOMMENDED_ACTION:</span> <span className="diag-val status-ok">RETURN_TO_HOME_COORDINATES</span></div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="notfound-actions">
          <Button to="/" variant="primary" className="action-btn">
            Return Home (SYS.ID)
          </Button>
          <Button to="/services" variant="secondary" className="action-btn">
            View Services & Pricing
          </Button>
          <Button to="/projects" variant="secondary" className="action-btn">
            Inspect Live Projects
          </Button>
        </div>

        {/* Quick Fallback Directory */}
        <div className="notfound-quick-links">
          <span className="quick-label">Active System Endpoints:</span>
          <div className="pills-wrap">
            <Link to="/contact" className="quick-pill">Contact Desk</Link>
            <Link to="/skills" className="quick-pill">Core Tech Stack</Link>
            <Link to="/experience" className="quick-pill">Experience</Link>
            <Link to="/education" className="quick-pill">Education (HIT)</Link>
            <Link to="/blogs" className="quick-pill">Tech Articles</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
