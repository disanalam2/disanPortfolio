import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import './Legal.scss';

const LegalLayout = ({ children, activePolicy }) => {
  const tabs = [
    { name: 'Privacy Policy', path: '/privacy-policy', icon: '🛡️' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions', icon: '⚖️' },
    { name: 'Refund & Cancellation', path: '/refund-policy', icon: '💳' },
    { name: 'Service Delivery', path: '/delivery-policy', icon: '🚀' }
  ];

  return (
    <PageLayout className="legal-section-wrapper">
      <div className="legal-container">
        
        {/* Compliance HUD Status Bar */}
        <div className="legal-status-bar" role="region" aria-label="Compliance Status">
          <div className="status-badge">
            <span className="pulse-dot" aria-hidden="true" />
            <span>Statutory Compliance & Legal Policies</span>
          </div>
          <div className="status-meta">
            <span>🏛️ Address: Azad Basti, Ranchi, Jharkhand (India)</span>
            <span>📅 Effective: October 2026</span>
          </div>
        </div>

        {/* Quick Switcher Navigation Tabs */}
        <nav className="legal-tabs-nav" aria-label="Legal Policies Navigation">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => 
                `legal-tab-item ${isActive || activePolicy === tab.name ? 'active' : ''}`
              }
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Dynamic Policy Article Card */}
        {children}

        {/* Grievance Redressal & Legal Officer Card */}
        <aside className="grievance-card" aria-label="Grievance Officer Information">
          <div className="grievance-header">
            <h3>
              <span aria-hidden="true">🏛️</span>
              <span>Grievance Officer & Legal Contact</span>
            </h3>
            <span className="compliance-law">IT Act 2000 & DPDP Act 2023 Compliant</span>
          </div>

          <div className="grievance-grid">
            <div className="grievance-item">
              <div className="item-label">Name of Officer</div>
              <div className="item-value">Disan Alam</div>
            </div>

            <div className="grievance-item">
              <div className="item-label">Designation</div>
              <div className="item-value">Founder & Lead Software Engineer</div>
            </div>

            <div className="grievance-item">
              <div className="item-label">Official Grievance Email</div>
              <div className="item-value">
                <a href="mailto:admin@disanalam.me">admin@disanalam.me</a>
              </div>
            </div>

            <div className="grievance-item">
              <div className="item-label">Official Phone / WhatsApp</div>
              <div className="item-value">
                <a href="tel:+918789047170">+91-8789047170</a>
              </div>
            </div>

            <div className="grievance-item">
              <div className="item-label">Registered Operational Address</div>
              <div className="item-value">Azad Basti, Ranchi, Jharkhand, India — 834001</div>
            </div>

            <div className="grievance-item">
              <div className="item-label">Redressal Timeframe</div>
              <div className="item-value">Acknowledgement within 24-48 Business Hours</div>
            </div>
          </div>

          <div className="grievance-note">
            In accordance with the Information Technology Act 2000, Consumer Protection (E-Commerce) Rules 2020, and Reserve Bank of India (RBI) payment aggregator regulations, any grievances, payment queries, or contract audit inquiries should be formally addressed to the Grievance Officer above.
          </div>
        </aside>

        {/* Bottom Navigation */}
        <div className="legal-footer-contact">
          Have questions or need a custom Enterprise Service Level Agreement (SLA)?{' '}
          <Link to="/contact">Contact directly via the Contact Portal →</Link>
        </div>

      </div>
    </PageLayout>
  );
};

export default LegalLayout;
