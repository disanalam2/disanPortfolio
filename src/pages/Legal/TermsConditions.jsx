import React from 'react';
import LegalLayout from './LegalLayout';
import SEO from '../../components/common/SEO';

const TermsConditions = () => {
  return (
    <LegalLayout activePolicy="Terms & Conditions">
      <SEO
        title="Terms & Conditions | Disan Alam"
        description="Official Terms and Conditions of Disan Alam (disanalam.me). Governs software development services, intellectual property ownership, Section 10A electronic contract validity, and Ranchi, Jharkhand jurisdiction."
        url="https://disanalam.me/terms-and-conditions"
      />

      <article className="legal-glass-card">
        <header className="policy-header">
          <span className="policy-badge">LEGAL COMPLIANCE • TERMS OF SERVICE</span>
          <h1>Terms & Conditions</h1>
          <p className="policy-intro">
            These Terms & Conditions (&quot;Agreement&quot;) constitute a legally binding agreement between Disan Alam (&quot;Developer&quot;, &quot;Consultant&quot;, &quot;we&quot;, &quot;us&quot;), operating via <strong>https://disanalam.me</strong>, and the individual, business entity, or organization (&quot;Client&quot;, &quot;you&quot;) commissioning software engineering, web development, or IT consulting services.
          </p>
        </header>

        <div className="policy-content">
          <section>
            <h2>
              <span className="section-num">01.</span>
              <span>Scope of Professional Services</span>
            </h2>
            <p>
              Disan Alam operates as an independent software engineer and technology consultant providing custom technical services, including but not limited to:
            </p>
            <ul>
              <li><strong>Full-Stack Web Engineering:</strong> Custom React, Next.js, Node.js, Express, and database-driven software applications.</li>
              <li><strong>Frontend & UI/UX Architecture:</strong> Responsive, high-performance web interfaces adhering to modern accessibility and Core Web Vitals standards.</li>
              <li><strong>Backend Architecture & API Integration:</strong> Scalable microservices, RESTful/GraphQL APIs, secure payment gateway integrations (Razorpay, Cashfree), and third-party SaaS connections.</li>
              <li><strong>Performance Optimization & Technical SEO Audits:</strong> Speed profiling, bundle tree-shaking, database indexing, and server-side optimization.</li>
              <li><strong>IT Consulting & Codebase Modernization:</strong> Technical feasibility analysis, legacy system migration, and DevOps advisory.</li>
            </ul>
            <p>
              The specific deliverables, milestones, pricing, and timelines for each engagement will be detailed in an agreed <strong>Statement of Work (SoW)</strong>, project proposal, or written service quote.
            </p>
          </section>

          {/* Statutory Clickwrap & Digital Contract Enforceability Callout */}
          <div className="callout-box statutory-callout">
            <div className="callout-title">
              <span aria-hidden="true">⚖️</span>
              <span>Clickwrap & Electronic Contract Validity (Section 10A, IT Act 2000)</span>
            </div>
            <p>
              In strict accordance with <strong>Section 10A of the Indian Information Technology Act, 2000 (IT Act, 2000)</strong>, electronic contracts and digital agreements possess full statutory validity, legal enforceability, and evidential weight in Indian courts of law.
            </p>
            <p style={{ marginTop: '0.65rem' }}>
              Any Statement of Work, quotation, estimate, or contract entered into via email confirmation, digital checkbox acceptance (&quot;clickwrap&quot;), OTP authentication, or electronic signature shall be deemed as validly executed as a physically signed agreement on stamp paper. Both parties irrevocably agree not to contest the enforceability of contracts formed through electronic communications.
            </p>
          </div>

          <section>
            <h2>
              <span className="section-num">02.</span>
              <span>Project Initiation & Milestone Payments</span>
            </h2>
            <p>
              Software development projects are executed on a structured milestone schedule. Work begins only upon receipt of the agreed onboarding advance payment:
            </p>
            <ul>
              <li><strong>Onboarding Advance:</strong> An initial advance deposit (typically 25% to 30% of total project valuation, or as specified in the SoW) is mandatory before sprint kickoff, research, or architecture design.</li>
              <li><strong>Milestone Invoicing:</strong> Subsequent milestone payments become due upon completion and demonstration of the respective deliverable phase (e.g., prototype approval, staging deployment, final production release).</li>
              <li><strong>Invoice Due Dates:</strong> All invoices issued are payable within 7 calendar days of transmission unless explicitly negotiated otherwise in writing.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">03.</span>
              <span>Intellectual Property & Code Ownership</span>
            </h2>
            <p>
              Code ownership, source repositories, and intellectual property rights are structured as follows:
            </p>
            <ul>
              <li>
                <strong>Retention of Title until 100% Payment:</strong> All proprietary source code, database schemas, architectural designs, algorithms, custom styling, and project artifacts created during the engagement remain the exclusive intellectual property of the Developer (Disan Alam) until <strong>100% of all agreed milestone payments, project invoices, and applicable taxes have been received and fully cleared in our account</strong>.
              </li>
              <li>
                <strong>Transfer of Commercial IP Rights:</strong> Upon full and final settlement of all financial obligations, the Developer grants and assigns to the Client full, worldwide commercial intellectual property rights to the custom code authored specifically for the project, alongside handover of production repositories and deployment credentials.
              </li>
              <li>
                <strong>Third-Party & Open Source Assets:</strong> Open-source frameworks, npm libraries, and third-party tools incorporated into the project remain governed by their respective open-source licenses (e.g., MIT, Apache 2.0, BSD-3-Clause, GPL).
              </li>
              <li>
                <strong>Portfolio & Marketing Rights:</strong> Unless protected by a mutually executed Non-Disclosure Agreement (NDA), the Developer reserves the right to showcase the completed work, project screenshots, and non-confidential case studies in personal portfolios and professional promotional materials.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">04.</span>
              <span>Client Responsibilities & Cooperation</span>
            </h2>
            <p>
              To ensure timely milestone delivery, the Client agrees to:
            </p>
            <ul>
              <li>Provide accurate project briefs, branding assets, copy, media, and third-party API credentials in a timely manner.</li>
              <li>Review milestone deliverables and provide unified feedback within 7 business days of delivery. Unresponsive delays exceeding 14 calendar days may lead to automatic milestone sign-off or rescheduling based on developer availability.</li>
              <li>Ensure that all materials, trademarks, and third-party content provided to the Developer do not infringe upon any third-party copyrights or intellectual property rights.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">05.</span>
              <span>Limitation of Liability & Disclaimer of Warranties</span>
            </h2>
            <p>
              While all software engineering is performed adhering to industry best practices, the Developer provides software on an &quot;as is&quot; and &quot;as available&quot; basis post-handover.
            </p>
            <ul>
              <li>
                <strong>Third-Party Infrastructure & API Disclaimer:</strong> The Developer shall NOT be held personally or financially liable for server downtime, data losses, or disruptions caused by third-party hosting platforms (e.g., AWS, Vercel, DigitalOcean), payment gateways (e.g., Razorpay, Cashfree), domain registrars, or unexpected deprecations/outages of external third-party APIs (e.g., Google Maps, OpenAI, Meta).
              </li>
              <li>
                <strong>Indirect & Consequential Damages:</strong> Under no circumstances shall the Developer be liable for indirect, incidental, punitive, or consequential damages, including loss of business profits, data corruption, or operational interruption.
              </li>
              <li>
                <strong>Aggregate Liability Cap:</strong> In all circumstances, the Developer&apos;s total aggregate financial liability arising out of or related to this Agreement shall be strictly capped at the total amount paid by the Client for the specific deliverable or milestone in dispute.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">06.</span>
              <span>Termination & Project Suspension</span>
            </h2>
            <p>
              Either party may terminate an engagement by providing 14 calendar days written notice via registered email.
            </p>
            <ul>
              <li>If the Client terminates the contract prior to completion, fees paid for completed milestones or work-in-progress are non-refundable (as detailed in our Refund & Cancellation Policy).</li>
              <li>The Developer reserves the right to suspend development or revoke staging access if milestone invoices remain unpaid beyond 14 days of the invoice due date.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">07.</span>
              <span>Governing Law & Exclusive Jurisdiction</span>
            </h2>
            <p>
              This Agreement, Statements of Work, and all disputes arising out of or in connection with the services provided shall be governed by and construed in accordance with the <strong>laws of the Republic of India</strong>, without giving effect to conflict of laws principles.
            </p>
            <p>
              Both parties irrevocably agree that any legal dispute, claim, litigation, or arbitration arising from this Agreement shall be subject to the <strong>exclusive territorial and subject-matter jurisdiction of the competent civil courts situated in Ranchi, Jharkhand, India</strong>.
            </p>
          </section>
        </div>
      </article>
    </LegalLayout>
  );
};

export default TermsConditions;
