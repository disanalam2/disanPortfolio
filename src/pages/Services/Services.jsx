import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';
import './Services.scss';

const Services = () => {
  const navigate = useNavigate();

  const handleSelectService = (subjectValue) => {
    navigate('/contact', {
      state: { subject: subjectValue }
    });
  };

  const serviceTiers = [
    {
      id: 'option-a',
      badge: 'OPTION A • FULL OWNERSHIP',
      title: 'One-Time Handover',
      subtitle: 'The "Full Ownership" Model',
      description: 'Engineered for self-sufficient teams and enterprises needing a turnkey, production-ready system with complete code and cloud autonomy.',
      initialPrice: '₹ 25,000',
      priceNote: 'One-Time Build • Milestone Delivery',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: "Client's own AWS account (Direct billing, zero markup).",
      turnaround: 'As per project scope',
      subjectValue: 'Option A: One-Time Handover (Full Ownership)',
      buttonText: 'Choose Option A (Full Ownership)',
      featured: false,
      deliverables: [
        'Complete Full-Stack Web Development (Next.js/React + Node.js/Express)',
        'Production Deployment on client AWS cloud (EC2, Nginx, SSL, PM2)',
        'Payment Gateway integration (Razorpay / Cashfree) with webhooks',
        '100% full source code ownership transferred upon final milestone',
        'Complete AWS root & IAM administrator credentials handover',
        '15 Days of Complimentary Post-Launch Bug Support included'
      ]
    },
    {
      id: 'option-b',
      badge: 'OPTION B • TECH PARTNER',
      title: 'Standard Maintenance',
      subtitle: 'The "Tech Partner" Model',
      description: 'Ideal for growing businesses seeking an accessible upfront build investment paired with dedicated ongoing code maintenance and technical vigilance.',
      initialPrice: '₹ 18,000',
      monthlyPrice: '+ ₹ 2,500 / month',
      priceNote: 'Initial Build + Monthly Maintenance Retainer',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: "Client pays their own AWS usage invoice directly via attached card.",
      turnaround: 'As per project scope + Monthly Maintenance',
      subjectValue: 'Option B: Standard Maintenance (Tech Partner)',
      buttonText: 'Choose Option B (Tech Partner)',
      featured: false,
      deliverables: [
        'Includes everything in Option A (React/Next.js, Node.js & Razorpay/Cashfree) + dedicated maintenance',
        'Continuous codebase maintenance, refactoring & minor feature additions',
        '24/7 server health monitoring, PM2 process supervision & log audits',
        'Routine security updates, dependency patches & Security Group audits',
        '100% client-owned source code — we manage updates while client retains cloud governance',
        'Dedicated WhatsApp / Email engineering channel with priority bug turnaround'
      ]
    },
    {
      id: 'option-c',
      badge: 'OPTION C • ZERO HEADACHE',
      popularRibbon: 'RECOMMENDED',
      title: 'Fully Managed & Hosted',
      subtitle: 'The "Zero-Headache" Model',
      description: 'Turnkey peace of mind for non-technical founders — we handle custom development, cloud infrastructure, databases, and 24/7 uptime without you ever touching an AWS dashboard.',
      initialPrice: '₹ 15,000',
      monthlyPrice: '+ ₹ 5,000 / month',
      priceNote: 'Lowest Upfront Capital + All-Inclusive Retainer',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: '100% All-Inclusive! Covers AWS EC2 compute, database backups, SSL renewals & developer fees.',
      turnaround: 'As per project scope + All-Inclusive SLA',
      subjectValue: 'Option C: Fully Managed & Hosted (Zero-Headache)',
      buttonText: 'Choose Option C (Zero-Headache)',
      featured: true,
      deliverables: [
        'Includes everything in Option B (Full-Stack build, Payment Gateways & maintenance) + 100% managed hosting',
        '24/7 High-Availability AWS Cloud Hosting fully provisioned & managed by us',
        'Automated daily database backups with point-in-time restoration capability',
        'Automated zero-downtime SSL certificate renewals & domain routing',
        '100% client-owned source code & IP — turnkey hosting and continuous SLA management',
        'Lowest upfront capital expenditure — launch fast without capital strain',
        'Priority Developer Support: content updates, performance tuning & technical guidance'
      ]
    }
  ];

  const comparisonRows = [
    {
      feature: 'Development & Build Timeline',
      optA: 'As per project scope',
      optB: 'As per project scope',
      optC: 'As per project scope'
    },
    {
      feature: 'Core Tech & Integrations',
      optA: 'Next.js, Node.js, AWS & Payment Gateway',
      optB: 'Next.js, Node.js, AWS & Payment Gateway',
      optC: 'Next.js, Node.js, AWS & Payment Gateway'
    },
    {
      feature: 'Upfront Build Investment',
      optA: '₹ 25,000 (One-Time)',
      optB: '₹ 18,000 (Reduced Initial)',
      optC: '₹ 15,000 (Lowest Entry)'
    },
    {
      feature: 'Monthly Retainer Fee',
      optA: '₹ 0 / month',
      optB: '₹ 2,500 / month',
      optC: '₹ 5,000 / month (All-Inclusive)'
    },
    {
      feature: 'Cloud Server & AWS Bill',
      optA: 'Client pays AWS directly',
      optB: 'Client pays AWS directly',
      optC: 'Included in Retainer (Zero AWS Bill)'
    },
    {
      feature: 'Source Code Ownership',
      optA: '100% Client Owned (Full Handover)',
      optB: '100% Client Owned (Maintained by Us)',
      optC: '100% Client Owned (Fully Managed by Us)'
    },
    {
      feature: 'Server & Database Operations',
      optA: 'Managed by Client',
      optB: 'Monitored by Developer',
      optC: '100% Managed & Maintained by Us'
    },
    {
      feature: 'SSL Renewals & Cloud Backups',
      optA: 'Client responsible',
      optB: 'Routine Backups & Renewals (Managed by Us)',
      optC: 'Automated Daily & Managed 24/7'
    },
    {
      feature: 'Post-Launch Support',
      optA: '15 Days Free Bug Support',
      optB: 'Ongoing Monthly Support',
      optC: '24/7 Priority SLA Support'
    },
    {
      feature: 'Best Suited For',
      optA: 'Self-reliant technical teams',
      optB: 'Startups wanting a tech partner',
      optC: 'Non-technical founders & businesses'
    }
  ];

  return (
    <PageLayout className="services-page">
      <SEO 
        title="Engineering Services & Transparent Pricing Models | Disan Alam"
        description="Explore Full-Stack Web Development, Cloud Infrastructure, and Managed Retainer packages by Disan Alam. Transparent pricing in INR (₹) with milestone delivery."
        url="https://disanalam.me/services"
      />

      {/* Page Header */}
      <div className="services-header-wrap">
        <div className="services-pill-badge">
          <span className="pulse-dot" aria-hidden="true" />
          <span>TRANSPARENT FREELANCE ENGINEERING & ENGAGEMENT MODELS</span>
        </div>
        
        <SectionTitle 
          title="Engineering Services & Engagement Models"
          subtitle="Three tailored engagement structures designed to give you clarity, full pricing predictability, and enterprise-grade software delivery."
        />
      </div>

      {/* 3 Core Engagement Cards */}
      <div className="services-cards-grid">
        {serviceTiers.map((tier) => (
          <div 
            key={tier.id} 
            className={`service-tier-card ${tier.featured ? 'featured-card' : ''}`}
          >
            {tier.popularRibbon && (
              <div className="popular-ribbon">
                <span>{tier.popularRibbon}</span>
              </div>
            )}

            <div className="tier-header">
              <span className="tier-badge">{tier.badge}</span>
              <span className="tier-turnaround">⚡ {tier.turnaround}</span>
            </div>

            <div className="tier-title-group">
              <h3 className="tier-title">{tier.title}</h3>
              <p className="tier-subtitle">{tier.subtitle}</p>
            </div>

            <p className="tier-description">{tier.description}</p>

            {/* Price Box */}
            <div className="tier-price-box">
              <div className="price-label">INVESTMENT (INR)</div>
              <div className="price-amount-wrap">
                <span className="price-main">{tier.initialPrice}</span>
                {tier.monthlyPrice && (
                  <span className="price-monthly">{tier.monthlyPrice}</span>
                )}
              </div>
              <div className="price-note">{tier.priceNote}</div>
            </div>

            {/* Server Bill Detail Card */}
            <div className="tier-server-pill">
              <div className="server-pill-title">
                <span aria-hidden="true">☁️</span>
                <strong>{tier.serverBillTitle}:</strong>
              </div>
              <div className="server-pill-desc">{tier.serverBillDesc}</div>
            </div>

            {/* Deliverables Checklist */}
            <div className="tier-deliverables">
              <div className="deliverables-heading">INCLUDED DELIVERABLES & TERMS</div>
              <ul className="deliverables-list">
                {tier.deliverables.map((item, idx) => (
                  <li key={idx}>
                    <span className="check-icon" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="tier-action-footer">
              <button 
                type="button"
                className={`tier-cta-button ${tier.featured ? 'btn-featured' : ''}`}
                onClick={() => handleSelectService(tier.subjectValue)}
              >
                <span>{tier.buttonText}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Comparison Matrix */}
      <div className="services-comparison-section">
        <div className="comparison-header">
          <div className="comparison-badge">SIDE-BY-SIDE EVALUATION</div>
          <h3 className="comparison-title">Which Model Fits Your Business Best?</h3>
          <p className="comparison-subtitle">
            Compare ownership rights, ongoing responsibilities, and infrastructure costs across all three packages.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="th-feature">Deliverables & Rights</th>
                <th className="th-opt">Option A: Full Ownership</th>
                <th className="th-opt">Option B: Tech Partner</th>
                <th className="th-opt th-opt-featured">Option C: Zero-Headache</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="td-feature">{row.feature}</td>
                  <td className="td-opt">{row.optA}</td>
                  <td className="td-opt">{row.optB}</td>
                  <td className="td-opt td-opt-featured">{row.optC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Trust & Compliance Callout */}
      <div className="services-trust-banner">
        <div className="trust-grid">
          <div className="trust-col">
            <div className="trust-icon" aria-hidden="true">⚖️</div>
            <h4>Section 10A IT Act 2000</h4>
            <p>100% legally binding electronic contracts and milestone-based sign-offs with legal validity across India.</p>
          </div>

          <div className="trust-col">
            <div className="trust-icon" aria-hidden="true">🔒</div>
            <h4>Zero Sensitive Storage</h4>
            <p>We never store credit/debit card numbers, UPI PINs, or Aadhaar credentials. Transactions run directly via RBI-authorized aggregators.</p>
          </div>

          <div className="trust-col">
            <div className="trust-icon" aria-hidden="true">📑</div>
            <h4>Statutory Invoicing</h4>
            <p>Official statutory invoices and bills of supply provided for corporate expense accounting and auditing.</p>
          </div>

          <div className="trust-col">
            <div className="trust-icon" aria-hidden="true">📍</div>
            <h4>Ranchi Jurisdiction</h4>
            <p>Official operational desk at Azad Basti, Ranchi, Jharkhand — 834001 under Indian commercial contract laws.</p>
          </div>
        </div>
      </div>

      {/* Bottom Discovery Consultation Callout */}
      <div className="services-bottom-cta">
        <div className="cta-content">
          <h3 className="cta-title">Need a Custom Enterprise Scope or Dedicated Architecture?</h3>
          <p className="cta-desc">
            Have a project with custom requirements, complex multi-cloud infrastructure, or specific team integration needs? Let&apos;s schedule a technical discovery call.
          </p>
        </div>
        <div className="cta-action">
          <Button 
            to="/contact" 
            variant="primary"
            state={{ subject: 'Enterprise Custom Web App (New Build)' }}
          >
            Initiate Custom Consultation →
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;