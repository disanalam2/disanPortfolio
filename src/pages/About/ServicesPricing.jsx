import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import './ServicesPricing.scss';

const ServicesPricing = () => {
  return (
    <section className="about-services-section" aria-label="Freelance Engineering Services & Starting Pricing">
      {/* Section HUD Header */}
      <div className="services-hud-header">
        <div className="services-hud-badge">
          <span className="pulse-dot" aria-hidden="true" />
          <span>FREELANCE SERVICES & TRANSPARENT PRICING</span>
        </div>
        <h3 className="services-section-title">
          Engineering Packages & Managed Services
        </h3>
        <p className="services-section-subtitle">
          Professional bespoke web development, custom full-stack software, and ongoing cloud maintenance. Clear starting estimates in INR (₹) with milestone-based delivery.
        </p>
      </div>

      {/* 3-Column Pricing Grid */}
      <div className="services-pricing-grid">
        
        {/* Tier 1: Frontend & Landing Page Engineering */}
        <Card className="service-pricing-card">
          <div className="card-top-badge">
            <span className="badge-tag">UI/UX • FAST LAUNCH</span>
            <span className="delivery-time">⚡ 1–2 Weeks</span>
          </div>

          <h4 className="service-card-title">Frontend & Landing Page Engineering</h4>
          <p className="service-card-summary">
            Conversion-focused, high-performance landing pages and responsive modern web interfaces built with React & Next.js.
          </p>

          <div className="pricing-box">
            <span className="pricing-label">Starting from</span>
            <div className="pricing-amount">
              <span className="currency-symbol">₹</span>
              <span className="amount-num">10,000</span>
            </div>
            <span className="pricing-term">Fixed Scope / Single Milestone</span>
          </div>

          <div className="features-divider" />

          <ul className="service-features-list">
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Custom React / Next.js Responsive UI</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>90+ Google Core Web Vitals Performance</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Technical SEO & OpenGraph Social Previews</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Contact Form & Direct Lead Routing</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>14 Days Post-Launch Defect Warranty</span>
            </li>
          </ul>

          <Link 
            to="/contact" 
            state={{ subject: 'Frontend & Landing Page Engineering' }}
            className="service-cta-btn"
          >
            <span>Book Frontend Service</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>
        </Card>

        {/* Tier 2: Full-Stack Web Application & API Integration (Featured) */}
        <Card className="service-pricing-card featured-service">
          <div className="featured-ribbon">MOST POPULAR</div>

          <div className="card-top-badge">
            <span className="badge-tag">FULL-STACK • PRODUCTION</span>
            <span className="delivery-time">⚡ 3–5 Weeks</span>
          </div>

          <h4 className="service-card-title">Full-Stack Web App & API Integration</h4>
          <p className="service-card-summary">
            End-to-end custom SaaS or business applications with robust Node.js backend, database architecture, and payment gateways.
          </p>

          <div className="pricing-box">
            <span className="pricing-label">Starting from</span>
            <div className="pricing-amount">
              <span className="currency-symbol">₹</span>
              <span className="amount-num">25,000</span>
            </div>
            <span className="pricing-term">Progressive 3-Milestone Schedule</span>
          </div>

          <div className="features-divider" />

          <ul className="service-features-list">
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>React/Next.js Frontend + Node.js/Express Backend</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Relational / NoSQL Database (MySQL, Postgres, Mongo)</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Payment Gateway (Razorpay / Cashfree) Integration</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>JWT Authentication, RBAC & API Security</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Real-Time WebSockets & External Third-Party APIs</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>30 Days Post-Deployment Warranty & Handover</span>
            </li>
          </ul>

          <Link 
            to="/contact" 
            state={{ subject: 'Full-Stack Web App & API Integration' }}
            className="service-cta-btn featured-cta"
          >
            <span>Build Full-Stack App</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>
        </Card>

        {/* Tier 3: Custom Enterprise Architecture & Retainer Management */}
        <Card className="service-pricing-card">
          <div className="card-top-badge">
            <span className="badge-tag">MANAGED • RETAINER SLA</span>
            <span className="delivery-time">⚡ Ongoing SLA</span>
          </div>

          <h4 className="service-card-title">Custom Enterprise & Managed Retainer</h4>
          <p className="service-card-summary">
            We build and manage your website end-to-end. Includes dedicated cloud hosting management, routine updates, bug fixes, and SLA support.
          </p>

          <div className="pricing-box">
            <span className="pricing-label">Pricing Model</span>
            <div className="pricing-amount custom-quote">
              <span className="amount-text">Custom Quote</span>
            </div>
            <span className="pricing-term">Milestone Builds • Retainers from ₹12,000/mo</span>
          </div>

          <div className="features-divider" />

          <ul className="service-features-list">
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>End-to-End System Architecture & Cloud Deployment</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Website Management, Content Updates & Retainer</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>AWS EC2 / Docker / Database Monitoring & Backups</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Security Audits, Package Upgrades & Bug Rectification</span>
            </li>
            <li>
              <span className="check-icon" aria-hidden="true">✓</span>
              <span>Priority Developer Communication & Quick SLA</span>
            </li>
          </ul>

          <Link 
            to="/contact" 
            state={{ subject: 'Custom Enterprise Build & Managed Retainer' }}
            className="service-cta-btn"
          >
            <span>Discuss Managed Retainer</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>
        </Card>

      </div>

      {/* Compliance & Trust Footnote Callout */}
      <div className="services-trust-callout">
        <div className="trust-callout-icon" aria-hidden="true">🛡️</div>
        <div className="trust-callout-content">
          <strong>Transparent & Statutory Milestone Billing:</strong> All engagements execute under a signed Statement of Work (SoW) in accordance with Section 10A of the Indian Information Technology Act, 2000. Invoices are issued in Indian Rupees (₹) and payments are processed via RBI-authorized payment aggregators (Razorpay / Cashfree) with zero sensitive card or KYC data stored.
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
