import React from 'react';
import LegalLayout from './LegalLayout';
import SEO from '../../components/common/SEO';

const PrivacyPolicy = () => {
  return (
    <LegalLayout activePolicy="Privacy Policy">
      <SEO
        title="Privacy Policy | Disan Alam"
        description="Official Privacy Policy of Disan Alam (disanalam.me). Learn how client data is handled, our zero sensitive storage guarantee for payments, and statutory data protections."
        url="https://disanalam.me/privacy-policy"
      />

      <article className="legal-glass-card">
        <header className="policy-header">
          <span className="policy-badge">LEGAL COMPLIANCE • PRIVACY POLICY</span>
          <h1>Privacy Policy</h1>
          <p className="policy-intro">
            This Privacy Policy governs how Disan Alam (&quot;Developer&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating via <strong>https://disanalam.me</strong>, collects, processes, utilizes, and safeguards the personal and business information of clients, prospects, and website visitors.
          </p>
        </header>

        <div className="policy-content">
          <section>
            <h2>
              <span className="section-num">01.</span>
              <span>Introduction & Applicability</span>
            </h2>
            <p>
              We are committed to maintaining the highest degree of data security, transparency, and integrity. This policy applies to all freelance web engineering contracts, technical consulting engagements, software development projects, and inquiries initiated through this website or associated direct communication channels.
            </p>
            <p>
              By accessing our website, requesting a project proposal, or entering into a software development contract, you acknowledge that you have read and agreed to the practices outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>
              <span className="section-num">02.</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We only collect data that is strictly necessary for providing software engineering services, executing contracts, and fulfilling statutory taxation obligations under Indian law.
            </p>

            <div className="policy-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Specific Fields Collected</th>
                    <th>Statutory & Operational Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Identity & Contact</strong></td>
                    <td>Full Name, Official Email Address, Phone Number / WhatsApp</td>
                    <td>Direct project scoping, development updates, contract communication, and support.</td>
                  </tr>
                  <tr>
                    <td><strong>Billing & Business</strong></td>
                    <td>Billing Address, Company Name, Registered State/PIN Code</td>
                    <td>Generating compliant digital estimates, invoices, and accounting records.</td>
                  </tr>
                  <tr>
                    <td><strong>Tax Identifiers (If Applicable)</strong></td>
                    <td>Permanent Account Number (PAN) / GSTIN (if provided by corporate clients)</td>
                    <td>Collected solely for issuing statutory invoices / bill of supply (and GST invoices, where applicable) and maintaining statutory tax compliance under Indian regulations.</td>
                  </tr>
                  <tr>
                    <td><strong>Technical & Audit Logs</strong></td>
                    <td>IP Address, Browser User-Agent, Date/Time Stamp</td>
                    <td>Preserving electronic contract audit trails (Section 10A of IT Act 2000) and preventing fraudulent activities.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>
              <span className="section-num">03.</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>Collected data is used strictly for legitimate business and legal purposes, including:</p>
            <ul>
              <li><strong>Project Scoping & Delivery:</strong> Reviewing project specifications, preparing architecture blueprints, and executing development milestones.</li>
              <li><strong>Electronic Contract Execution:</strong> Executing legally enforceable Statements of Work (SoW), digital agreements, and service level agreements.</li>
              <li><strong>Accounting & Invoicing:</strong> Generating statutory invoices / bill of supply (and GST invoices, where applicable), payment receipts, and ledger maintenance in compliance with Indian taxation laws.</li>
              <li><strong>Direct Client Communication:</strong> Transmitting milestone deliverables, deployment credentials, preview URLs, and maintenance notices.</li>
            </ul>
          </section>

          {/* Zero Sensitive Storage Guarantee Highlight Box */}
          <div className="callout-box">
            <div className="callout-title">
              <span aria-hidden="true">🔒</span>
              <span>Zero Sensitive Data Storage Guarantee (KYC & Payment Data)</span>
            </div>
            <p>
              <strong>We do NOT store, process, or have access to your sensitive financial payment credentials.</strong>
            </p>
            <ul>
              <li>We never collect or retain Debit Card or Credit Card numbers, CVV, or card expiration details.</li>
              <li>We never request or store Net Banking credentials, UPI PINs, or MPINs.</li>
              <li>We never collect or store your 12-digit Aadhaar number or biometric KYC data on our databases.</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>
              All monetary transactions are processed directly through <strong>RBI-authorized, PCI-DSS Level 1 certified Payment Aggregators (such as Razorpay or Cashfree)</strong>. Our systems only receive an encrypted transaction reference ID and confirmation of payment status (success/failure).
            </p>
          </div>

          <section>
            <h2>
              <span className="section-num">04.</span>
              <span>Third-Party Sharing & Disclosure</span>
            </h2>
            <p>
              We adhere to a strict <strong>Zero-Sale Policy</strong>. We do not sell, rent, trade, lease, or monetize your personal or business data with third-party advertisers, data aggregators, or marketing agencies under any circumstances.
            </p>
            <p>Data may only be shared with external entities in the following limited circumstances:</p>
            <ul>
              <li><strong>Payment Aggregators (Razorpay / Cashfree):</strong> Solely to process authenticated payment transactions initiated by the client.</li>
              <li><strong>Statutory Tax Authorities:</strong> When legally mandated for statutory tax filings or complying with lawful government subpoenas under applicable Indian laws.</li>
              <li><strong>Cloud Infrastructure Providers:</strong> Standard enterprise hosting (e.g., Google Firebase, AWS, Vercel, VPS) solely for frontend/backend staging and production deployment authorized by the client in writing.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">05.</span>
              <span>Data Retention & Security Measures</span>
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical controls to protect your data:
            </p>
            <ul>
              <li>All web traffic on <code>https://disanalam.me</code> is strictly encrypted using <strong>TLS/SSL 256-bit encryption</strong>.</li>
              <li>Project repositories, deployment keys, and sensitive environment variables are managed with strict principle-of-least-privilege access and encrypted secrets storage.</li>
              <li>Invoice records are retained for the statutory retention period required by Indian taxation authorities (typically 8 financial years), after which they are securely purged.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">06.</span>
              <span>Client Rights under Indian DPDP Act 2023</span>
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Indian privacy regulations, you have the following rights regarding your data:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> You may request a summary of the personal data held about you.</li>
              <li><strong>Right to Correction & Erasure:</strong> You can request corrections to inaccurate personal data or request deletion of data that is no longer required for statutory tax compliance.</li>
              <li><strong>Right of Grievance Redressal:</strong> You have the right to register concerns or complaints directly with our designated Grievance Officer.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">07.</span>
              <span>Cookies & Tracking Technologies</span>
            </h2>
            <p>
              Our website uses strictly minimal, privacy-conscious performance cookies and local storage to preserve theme preferences and monitor website health. We do not deploy intrusive third-party cross-site tracking pixels or advertising cookies.
            </p>
          </section>

          <section>
            <h2>
              <span className="section-num">08.</span>
              <span>Updates to This Policy</span>
            </h2>
            <p>
              We reserve the right to periodically update this Privacy Policy to reflect evolving regulatory frameworks or service enhancements. The &quot;Effective Date&quot; at the top of this document indicates the latest revision. Continued engagement after modifications constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </article>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
