import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '../common/SocialLinks';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* Main 3-Column Footer Grid */}
        <div className="footer-main-grid">
          
          {/* Column 1: Brand & Service Scope */}
          <div className="footer-col-brand">
            <div className="brand-title-wrap">
              <span className="brand-dot" aria-hidden="true" />
              <Link to="/" className="brand-name">Disan Alam</Link>
            </div>
            <p className="brand-role">Full-Stack Web Engineer & IT Consultant</p>
            <p className="brand-desc">
              Designing and developing high-performance web applications, scalable APIs, and bespoke software solutions with enterprise reliability.
            </p>
            <div className="brand-location">
              <span aria-hidden="true">📍</span>
              <span>Ranchi, Jharkhand, India — 834001</span>
            </div>
          </div>

          {/* Column 2: Legal & Statutory Compliance Policies */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">Legal & Policies</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/privacy-policy">
                  <span className="link-bullet">›</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">
                  <span className="link-bullet">›</span>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-policy">
                  <span className="link-bullet">›</span>
                  <span>Refund & Cancellation</span>
                </Link>
              </li>
              <li>
                <Link to="/delivery-policy">
                  <span className="link-bullet">›</span>
                  <span>Service Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <span className="link-bullet">›</span>
                  <span>Contact & Grievance Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Gateway Compliance Badges */}
          <div className="footer-col-trust">
            <h4 className="footer-col-heading">Trust & Security</h4>
            <div className="trust-badges-list">
              <div className="trust-badge-item">
                <span className="badge-icon" aria-hidden="true">🔒</span>
                <div>
                  <strong>RBI-Authorized Gateways</strong>
                  <div>Payments processed via Razorpay / Cashfree with zero sensitive data storage.</div>
                </div>
              </div>

              <div className="trust-badge-item">
                <span className="badge-icon" aria-hidden="true">⚖️</span>
                <div>
                  <strong>Section 10A IT Act 2000</strong>
                  <div>100% legally enforceable digital contracts, proposals, and electronic agreements.</div>
                </div>
              </div>

              <div className="trust-badge-item">
                <span className="badge-icon" aria-hidden="true">🚀</span>
                <div>
                  <strong>Electronic Delivery</strong>
                  <div>Digital software fulfillment via private GitHub repos and cloud deployments.</div>
                </div>
              </div>
            </div>

            <Link to="/contact" className="footer-hire-cta">
              <span>Initiate a Project / Request a Quote</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>

        {/* Ambient Horizontal Circuit Line */}
        <div className="footer-divider-line" aria-hidden="true" />

        {/* Bottom Sub-Footer Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {year} Disan Alam. All rights reserved.
            <span className="copy-sub">
              Independent Software Engineering & Technology Consulting • Governed under the laws of India.
            </span>
          </p>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
