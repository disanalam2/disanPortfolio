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
      badge: 'OPTION A • BESPOKE FREELANCE',
      title: 'Bespoke Freelance Build',
      subtitle: 'The "Classic Freelance" Model',
      description: 'Standard bespoke freelancing project. Custom full-stack web application engineered from scratch to your exact specifications and delivered with 100% full source code ownership upon milestone delivery.',
      initialPrice: 'Starting at ₹ 30,000',
      priceNote: 'One-Time Milestone Build • Scope-Based',
      serverBillTitle: 'Hosting / Cloud',
      serverBillDesc: "Client's choice of server or hosting provider (Zero monthly developer fees).",
      turnaround: 'As per project scope',
      subjectValue: 'Option A: Bespoke Freelance Build',
      buttonText: 'Choose Option A (Freelance Build)',
      featured: false,
      deliverables: [
        'Custom Full-Stack Web Development (Next.js/React + Node.js/Express + DB)',
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
      description: 'Custom full-stack build paired with a dedicated, isolated AWS cloud environment architected directly in YOUR name. I handle all development, continuous maintenance, and 24/7 PM2 monitoring—you only pay the actual raw AWS bill directly.',
      initialPrice: 'Starting at ₹ 25,000',
      monthlyPrice: '+ ₹ 2,500 / month',
      priceNote: 'Initial Build + Code Maintenance & Cloud Vigilance Retainer',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: "Dedicated AWS Account in Client's Name (Client pays raw AWS bill directly with zero markup).",
      turnaround: 'As per project scope + Continuous Retainer',
      subjectValue: 'Option B: Dedicated AWS Setup & Tech Partner',
      buttonText: 'Choose Option B (Dedicated AWS)',
      featured: false,
      deliverables: [
        'Complete Full-Stack Web Engineering with 100% client-owned source code',
        'Dedicated AWS Cloud Setup registered under client’s name (EC2, PM2, Nginx, SSL, IAM)',
        'Continuous codebase maintenance, refactoring & security patches',
        '24/7 server health monitoring, PM2 process supervision & AWS security audits',
        'Client pays actual AWS usage directly—complete cloud transparency and ownership',
        'Dedicated WhatsApp / Email engineering channel with priority turnaround'
      ]
    },
    {
      id: 'option-c',
      badge: 'OPTION C • MODULAR SAAS',
      popularRibbon: 'RECOMMENDED',
      title: 'Modular SaaS Platform',
      subtitle: 'The "Feature-on-Demand" Model',
      description: 'A modular, multi-tenant software ecosystem with pre-built core architecture. Choose only the features your business needs today to launch fast at lowest cost. Request new custom modules anytime that seamlessly plug into your platform.',
      initialPrice: 'From ₹ 12,000',
      monthlyPrice: '+ ₹ 2,500 / month',
      priceNote: 'Base Foundation + Pick Your Modules • Pay As You Grow',
      serverBillTitle: 'Cloud / Server Bill',
      serverBillDesc: 'Zero AWS Bill! 100% covered inside the monthly retainer (Managed Cloud by Disan).',
      turnaround: '48–72h Fast Launch + Continuous Upgrades',
      subjectValue: 'Option C: Modular SaaS Platform (Feature-on-Demand)',
      buttonText: 'Choose Option C (Modular SaaS)',
      featured: true,
      deliverables: [
        'Pre-built core foundation (Auth, User Roles, Secure Database, Admin Dashboard) for 48h launch',
        'Pick your modules a-la-carte (Invoicing, Inventory, Telemetry, CRM, Payments)—pay only for what you need',
        'Feature-on-Demand: Request custom business features developed as pluggable platform modules at discounted rates',
        'Zero AWS complexity: Server compute, databases, SSL renewals & backups 100% managed by Disan',
        'Automated daily database backups with point-in-time recovery capability',
        'Universal platform upgrades: Continuous speed optimizations, security patches & new module releases',
        'Priority Developer SLA Support & ongoing technical guidance'
      ]
    }
  ];

  const comparisonRows = [
    {
      feature: 'Development & Launch Timeline',
      optA: 'As per project scope',
      optB: 'As per project scope',
      optC: 'Rapid 48–72h for Core Engine'
    },
    {
      feature: 'Model Architecture',
      optA: 'Bespoke Freelance Delivery',
      optB: 'Dedicated AWS Cloud Partner',
      optC: 'Modular Multi-Tenant SaaS'
    },
    {
      feature: 'Core Tech & Integrations',
      optA: 'Next.js, Node.js, AWS & Payment Gateway',
      optB: 'Next.js, Node.js, AWS & Payment Gateway',
      optC: 'Pre-built Core Engine + Pluggable Modules'
    },
    {
      feature: 'Upfront Setup Investment',
      optA: 'Starting at ₹ 30,000',
      optB: 'Starting at ₹ 25,000',
      optC: 'Starting from ₹ 12,000 (Base Engine)'
    },
    {
      feature: 'Monthly Retainer Fee',
      optA: '₹ 0 / month',
      optB: '₹ 2,500 / month (Maintenance)',
      optC: 'From ₹ 2,500 / month (Hosting + Modules)'
    },
    {
      feature: 'Cloud Server & AWS Bill',
      optA: 'Client choice (Zero developer monthly fee)',
      optB: 'Client pays raw AWS bill directly in own name',
      optC: 'Zero AWS Bill! 100% covered by Disan'
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
      optC: 'Modular SaaS Platform Access (Isolated Tenant)'
    },
    {
      feature: 'Feature Customization & Upgrades',
      optA: 'Fixed to initial project scope',
      optB: 'New features quoted per scope',
      optC: 'Feature-on-Demand: Request new pluggable modules'
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
      optC: '24/7 Priority SLA & Continuous Platform Updates'
    },
    {
      feature: 'Best Suited For',
      optA: 'Clients needing standard one-time freelance build',
      optB: 'Businesses wanting dedicated AWS in their name',
      optC: 'Businesses wanting lowest entry cost & modular growth'
    }
  ];

  const faqItems = [
    {
      q: "Who is Disan Alam and what web engineering & AI services does he provide?",
      a: "Disan Alam is a Full-Stack Systems Architect, AI Business Solutions Consultant, and 2nd-year B.Tech CSE (Cyber Security) undergraduate at Haldia Institute of Technology based in Ranchi, Jharkhand. He specializes in bespoke web application engineering (React, Next.js, Node.js), Agentic AI workflows, custom RAG integrations, and modular multi-tenant cloud architectures for businesses globally."
    },
    {
      q: "What is the difference between Option A, Option B, and Option C?",
      a: "Option A is classic freelancing: one-time custom development with full source code handover starting at ₹30,000 (₹0/month). Option B is a dedicated cloud tech partner model (starting at ₹25,000 build + ₹2,500/month) where we set up a dedicated AWS account in YOUR name, handle all ongoing maintenance, and you pay the raw AWS bill directly. Option C is our modular SaaS platform (from ₹12,000 base setup + from ₹2,500/month) where you launch instantly using our pre-built core engine, pay only for the modules you activate, and request custom features on demand with zero AWS hosting bills or complexity."
    },
    {
      q: "How does the Modular SaaS (Option C) 'Feature-on-Demand' model work?",
      a: "Option C eliminates massive upfront development costs by giving you access to our battle-tested core software engine (Authentication, Roles, Secure Database, Admin Dashboard). You select only the business modules you need today (such as WhatsApp Invoicing, Inventory, Bookings, or Payments). If your business requires a custom feature that is not yet in our catalog, we build it for you as a pluggable module at a heavily discounted rate, which integrates seamlessly into your platform and joins our universal ecosystem."
    },
    {
      q: "Who owns the source code and how does cloud ownership work?",
      a: "In Option A (Freelance) and Option B (Dedicated AWS), 100% of the custom source code and repository belongs strictly to the client. In Option B, the AWS infrastructure is registered in your own name. In Option C (Modular SaaS), Disan owns and manages the underlying core platform and shared high-availability cloud infrastructure, while clients receive full operational tenant access, strict data isolation, and ongoing platform upgrades without ever having to manage AWS accounts or server maintenance."
    },
    {
      q: "What are the starting prices across the three engagement models?",
      a: "All models are transparently priced: Option A starts at ₹30,000 one-time for standard MVP builds; Option B starts at ₹25,000 upfront + ₹2,500/month for dedicated AWS architecture and maintenance; Option C starts from ₹12,000 upfront (Base Engine) + from ₹2,500/month (Hosting & Active Modules), with add-on modules and custom features priced a-la-carte as you grow."
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
        "description": "Custom web application engineering, autonomous Agentic AI workflows, custom RAG knowledge bases, and modular cloud architectures across 3 transparent engagement models.",
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
              "name": "Option C: Modular SaaS Platform (Feature-on-Demand)",
              "price": "12000.00",
              "priceCurrency": "INR",
              "description": "Modular multi-tenant software platform starting from ₹12,000 base setup + from ₹2,500/month all-inclusive cloud hosting. Pick modules a-la-carte and request custom features on demand."
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
        description="Explore Full-Stack Web Systems, Agentic AI, Custom RAG, and Modular SaaS packages by Disan Alam. Transparent milestone pricing starting from ₹12,000 to ₹30,000 across flexible engagement models."
        url="https://www.disanalam.me/services"
        keywords="Disan Alam Services, Full Stack Systems Architect, AI Business Solutions, Agentic AI, Custom RAG, Web Development Pricing, Bespoke Freelance ₹30000, Dedicated AWS ₹25000, Modular SaaS ₹12000, React Developer, Node.js, AWS Cloud, Ranchi, India"
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