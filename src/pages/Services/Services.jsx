import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';
import './Services.scss';

const Services = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSelectService = (subjectValue) => {
    navigate('/contact', {
      state: { subject: subjectValue }
    });
  };

  const serviceTiers = [
    {
      id: 'option-a',
      badge: 'OPTION A • FREELANCE BUILD',
      title: 'Bespoke Freelance Build',
      subtitle: 'The "Classic Freelance" Model',
      description: 'Standard bespoke freelancing project. Custom full-stack web application engineered to your specifications and handed over with 100% full source code upon milestone delivery.',
      initialPrice: '₹ 30,000',
      priceNote: 'One-Time Build • Milestone Delivery',
      serverBillTitle: 'Hosting / Cloud',
      serverBillDesc: "Client's choice of server or hosting (Zero monthly developer fees).",
      turnaround: 'As per project scope',
      subjectValue: 'Option A: Bespoke Freelance Build',
      buttonText: 'Choose Option A (Freelance Build)',
      featured: false,
      deliverables: [
        'Complete Custom Full-Stack Web Development (Next.js/React + Node.js/Express)',
        'Payment Gateway integration (Razorpay / Cashfree) with secure webhooks',
        '100% full source code & asset repository transferred to client upon final milestone',
        'Production deployment to client’s preferred server or hosting environment',
        '15 Days of Complimentary Post-Launch Bug Support included'
      ]
    },
    {
      id: 'option-b',
      badge: 'OPTION B • DEDICATED AWS',
      title: 'Dedicated AWS Setup & Tech Partner',
      subtitle: 'The "Dedicated Cloud" Model',
      description: 'We engineer your solution and architect a dedicated, isolated AWS cloud infrastructure registered directly in YOUR name. I handle all development, continuous maintenance, and monitoring—you only pay the actual AWS bill directly.',
      initialPrice: '₹ 25,000',
      monthlyPrice: '+ ₹ 2,500 / month',
      priceNote: 'Initial Build + Monthly Maintenance Retainer',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: "Dedicated AWS Account in Client's Name (Client pays raw AWS bill directly with zero markup).",
      turnaround: 'As per project scope + Monthly Maintenance',
      subjectValue: 'Option B: Dedicated AWS Setup & Tech Partner',
      buttonText: 'Choose Option B (Dedicated AWS)',
      featured: false,
      deliverables: [
        'Complete Full-Stack Web Engineering with 100% client-owned source code',
        'Dedicated AWS Cloud Setup registered under client’s name (EC2, PM2, Nginx, SSL, IAM)',
        'Continuous codebase maintenance, refactoring & ongoing technical vigilance',
        '24/7 server health monitoring, PM2 process supervision & AWS security audits',
        'Client pays actual AWS usage directly—complete cloud transparency and ownership',
        'Dedicated WhatsApp / Email engineering channel with priority bug turnaround'
      ]
    },
    {
      id: 'option-c',
      badge: 'OPTION C • MANAGED SAAS',
      popularRibbon: 'RECOMMENDED',
      title: 'Managed Multi-Tenant Solution',
      subtitle: 'The "Turnkey SaaS" Model',
      description: 'Zero cloud complexity. We provide a complete multi-tenant software solution hosted on our managed high-availability cloud. We manage all AWS infrastructure, databases, scaling, and backups—you simply use the software.',
      initialPrice: '₹ 20,000',
      monthlyPrice: '+ ₹ 5,000 / month',
      priceNote: 'Lowest Onboarding Capital + All-Inclusive Retainer',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: 'Zero AWS Bill! 100% covered inside the ₹5,000/mo retainer (EC2, databases, backups, SSL).',
      turnaround: 'As per project scope + All-Inclusive SLA',
      subjectValue: 'Option C: Managed Multi-Tenant Solution (Turnkey SaaS)',
      buttonText: 'Choose Option C (Managed SaaS)',
      featured: true,
      deliverables: [
        'Turnkey multi-tenant software solution tailored to your operational workflows',
        'High-availability cloud infrastructure fully provisioned, hosted & managed by Disan',
        'Zero AWS account management required—we handle all server bills & provisioning',
        'Automated daily database backups with point-in-time recovery capability',
        'Automated zero-downtime SSL certificate renewals & custom domain routing',
        'Lowest upfront capital expenditure with continuous platform updates & SLA support',
        'Priority Developer Support: feature enhancements, operational tuning & technical guidance'
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
      feature: 'Model Architecture',
      optA: 'Bespoke Freelance Delivery',
      optB: 'Dedicated AWS Cloud Partner',
      optC: 'Turnkey Multi-Tenant SaaS'
    },
    {
      feature: 'Core Tech & Integrations',
      optA: 'Next.js, Node.js, AWS & Payment Gateway',
      optB: 'Next.js, Node.js, AWS & Payment Gateway',
      optC: 'Next.js, Node.js, AWS & Payment Gateway'
    },
    {
      feature: 'Upfront Build Investment',
      optA: '₹ 30,000 (One-Time)',
      optB: '₹ 25,000 (Reduced Initial)',
      optC: '₹ 20,000 (Lowest Entry)'
    },
    {
      feature: 'Monthly Retainer Fee',
      optA: '₹ 0 / month',
      optB: '₹ 2,500 / month',
      optC: '₹ 5,000 / month (All-Inclusive)'
    },
    {
      feature: 'Cloud Server & AWS Bill',
      optA: 'Client choice (Zero developer monthly fee)',
      optB: 'Client pays raw AWS bill directly in own name',
      optC: 'Zero AWS Bill! Included in ₹5,000 retainer'
    },
    {
      feature: 'AWS Cloud Infrastructure',
      optA: 'Deployed to client’s server/hosting',
      optB: 'Dedicated AWS setup registered in client’s name',
      optC: 'Managed multi-tenant cloud by Disan'
    },
    {
      feature: 'Source Code & Platform Access',
      optA: '100% Client Owned (Full Code Handover)',
      optB: '100% Client Owned (Dedicated AWS Account)',
      optC: 'Managed Multi-Tenant Solution Access (Turnkey SaaS)'
    },
    {
      feature: 'Server & Database Operations',
      optA: 'Managed by Client',
      optB: 'Monitored & Maintained by Developer on Client AWS',
      optC: '100% Managed & Maintained by Us'
    },
    {
      feature: 'SSL Renewals & Cloud Backups',
      optA: 'Client responsible',
      optB: 'Managed on client AWS by Developer',
      optC: 'Automated Daily & Managed 24/7'
    },
    {
      feature: 'Post-Launch Support',
      optA: '15 Days Free Bug Support',
      optB: 'Ongoing Dedicated Monthly Support',
      optC: '24/7 Priority SLA Support'
    },
    {
      feature: 'Best Suited For',
      optA: 'Clients needing standard freelancing build',
      optB: 'Businesses wanting dedicated AWS in their name',
      optC: 'Non-technical founders wanting turnkey software'
    }
  ];

  const faqItems = [
    {
      q: "Who is Disan Alam and what web engineering & AI services does he provide?",
      a: "Disan Alam is a Full-Stack Systems Architect, AI Business Solutions Consultant, and 2nd-year B.Tech CSE (Cyber Security) undergraduate at Haldia Institute of Technology based in Ranchi, Jharkhand. He specializes in bespoke web application engineering (React, Next.js, Node.js), Agentic AI workflows, custom RAG integrations, and AWS cloud deployments for businesses globally."
    },
    {
      q: "What is the difference between Option A, Option B, and Option C?",
      a: "Option A is classic freelancing: custom development with full source code handover starting at ₹30,000 (₹0/month). Option B is a dedicated cloud tech partner model (₹25,000 build + ₹2,500/month) where we set up a dedicated AWS account in YOUR name, handle all maintenance, and you pay the raw AWS bill directly. Option C is a turnkey multi-tenant software solution (₹20,000 build + ₹5,000/month) hosted entirely on our managed cloud with zero AWS bills or setup hassle for you."
    },
    {
      q: "Who owns the source code and how does cloud ownership work?",
      a: "In Option A (Freelance) and Option B (Dedicated AWS), 100% of the source code belongs strictly to the client. In Option B, the AWS infrastructure is registered in your own name. In Option C, we provide a managed multi-tenant software solution (like a SaaS platform) where we manage the shared cloud and backups so you never have to deal with AWS dashboards."
    },
    {
      q: "What does the Multi-Tenant Managed Solution (Option C) include?",
      a: "Option C provides a complete multi-tenant software solution for ₹20,000 upfront + an all-inclusive ₹5,000/month retainer. You never pay a separate AWS bill—server compute, automated database backups, zero-downtime SSL renewals, and platform updates are all handled by us."
    },
    {
      q: "Can I hire Disan Alam for local IT consulting and web development in Ranchi, Jharkhand?",
      a: "Yes. Disan Alam operates from Azad Basti, Ranchi, Jharkhand (834001) for local business discovery, IT consulting, and in-person architecture sessions, while actively serving clients across India and internationally."
    },
    {
      q: "How does the milestone-based payment and development process work?",
      a: "Projects operate under legally binding electronic contracts (Section 10A IT Act 2000). Work is broken into agreed deliverables and milestone payments processed securely via RBI-authorized aggregators (Razorpay, Cashfree, UPI, Bank Transfer). You only approve payments upon verifying completed deliverables."
    }
  ];

  const servicePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.disanalam.me/services#service",
        "name": "Full-Stack Web Systems & AI Business Solutions",
        "provider": {
          "@type": "Person",
          "name": "Disan Alam",
          "url": "https://www.disanalam.me"
        },
        "description": "Custom web application engineering, autonomous Agentic AI workflows, custom RAG knowledge bases, and cloud architecture across 3 transparent engagement models.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Engineering & AI Solutions Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Option A: Bespoke Freelance Build",
              "price": "30000.00",
              "priceCurrency": "INR",
              "description": "Standard freelancing build, payment gateway integration, 100% source code ownership handover, and 15 days free bug support."
            },
            {
              "@type": "Offer",
              "name": "Option B: Dedicated AWS Setup & Tech Partner",
              "price": "25000.00",
              "priceCurrency": "INR",
              "description": "Custom full-stack build + dedicated AWS cloud setup in client's name + ₹2,500/month continuous maintenance. Client pays raw AWS bill directly."
            },
            {
              "@type": "Offer",
              "name": "Option C: Managed Multi-Tenant Solution (Turnkey SaaS)",
              "price": "20000.00",
              "priceCurrency": "INR",
              "description": "Turnkey multi-tenant software solution including all 24/7 AWS cloud hosting bills, managed database, automated backups, and priority support for ₹5,000/month."
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.disanalam.me/services#faq",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <PageLayout className="services-page">
      <SEO 
        title="Engineering Services & AI Business Solutions | Disan Alam"
        description="Explore Full-Stack Web Systems, Agentic AI, Custom RAG, and Managed Retainer packages by Disan Alam. Transparent milestone pricing starting from ₹20,000 to ₹30,000 with 100% client source code ownership."
        url="https://www.disanalam.me/services"
        keywords="Disan Alam Services, Full Stack Systems Architect, AI Business Solutions, Agentic AI, Custom RAG, Web Development Pricing, One-Time Handover ₹30000, Tech Partner ₹25000, Fully Managed Retainer ₹20000, React Developer, Node.js, AWS Cloud, Ranchi, India"
        schema={servicePageSchema}
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

      {/* Strategic Discovery & AI Solutions Framework */}
      <div className="services-framework-card">
        <div className="framework-header">
          <span className="framework-tag">HOLISTIC DIGITAL TRANSFORMATION</span>
          <h3 className="framework-title">Beyond Simple Websites: End-to-End Business Solutions</h3>
          <p className="framework-description">
            I don&apos;t just assemble off-the-shelf website templates. I dive deep into your organization&apos;s daily operations, customer drop-off points, data silos, and technical bottlenecks to architect a bespoke, high-leverage digital solution.
          </p>
        </div>

        <div className="framework-features-grid">
          <div className="framework-feature-item">
            <div className="feature-icon-badge" aria-hidden="true">🔍</div>
            <div className="feature-text">
              <h4 className="feature-title">Deep Business &amp; Industry Discovery</h4>
              <p className="feature-desc">Meticulous analysis of your operational workflows and competitive landscape before engineering any code, ensuring maximum business impact.</p>
            </div>
          </div>

          <div className="framework-feature-item">
            <div className="feature-icon-badge" aria-hidden="true">🤖</div>
            <div className="feature-text">
              <h4 className="feature-title">Agentic AI &amp; Custom RAG Workflows</h4>
              <p className="feature-desc">Autonomous multi-agent execution, intelligent operations, and custom RAG pipelines trained securely on your company&apos;s proprietary knowledge base.</p>
            </div>
          </div>

          <div className="framework-feature-item">
            <div className="feature-icon-badge" aria-hidden="true">☁️</div>
            <div className="feature-text">
              <h4 className="feature-title">Production Cloud &amp; Payment Systems</h4>
              <p className="feature-desc">High-performance Next.js/React frontends, Node.js microservices, Razorpay/Cashfree payment flows, and resilient AWS EC2 deployments.</p>
            </div>
          </div>

          <div className="framework-feature-item">
            <div className="feature-icon-badge" aria-hidden="true">📱</div>
            <div className="feature-text">
              <h4 className="feature-title">Cross-Platform Mobile Expansion (Roadmap)</h4>
              <p className="feature-desc">Modular API-first architectures built to seamlessly scale into native-feel iOS and Android mobile apps (React Native / Flutter) within 2–3 months.</p>
            </div>
          </div>
        </div>
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

      {/* Direct RAG & Human FAQ Accordion Section */}
      <div className="services-faq-section">
        <div className="faq-header">
          <div className="faq-badge">FREQUENTLY ASKED QUESTIONS</div>
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <p className="faq-subtitle">
            Direct, transparent answers regarding engagement models, source code ownership, cloud infrastructure, and project workflows.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqItems.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button 
                  type="button" 
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div 
                    id={`faq-answer-${index}`} 
                    className="faq-answer-wrap"
                  >
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
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
            state={{ subject: 'Other' }}
          >
            Initiate Custom Consultation →
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;