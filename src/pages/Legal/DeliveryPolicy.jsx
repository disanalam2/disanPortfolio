import React from 'react';
import LegalLayout from './LegalLayout';
import SEO from '../../components/common/SEO';

const DeliveryPolicy = () => {
  return (
    <LegalLayout activePolicy="Service Delivery">
      <SEO
        title="Service Delivery & Shipping Policy | Disan Alam"
        description="Official Service Delivery and Shipping Policy of Disan Alam (disanalam.me). Explaining our 100% digital electronic delivery model via GitHub, cloud servers, and registered email."
        url="https://disanalam.me/delivery-policy"
      />

      <article className="legal-glass-card">
        <header className="policy-header">
          <span className="policy-badge">LEGAL COMPLIANCE • DIGITAL DELIVERY</span>
          <h1>Service Delivery & Shipping Policy</h1>
          <p className="policy-intro">
            This Service Delivery and Shipping Policy clarifies the fulfillment channels, turnaround timelines, and acceptance processes for software engineering, web application development, and IT consulting services provided by Disan Alam (&quot;Developer&quot;, &quot;we&quot;, &quot;us&quot;) through <strong>https://disanalam.me</strong>.
          </p>
        </header>

        <div className="policy-content">
          {/* Statutory Digital Delivery Statement Callout */}
          <div className="callout-box statutory-callout">
            <div className="callout-title">
              <span aria-hidden="true">📦</span>
              <span>100% Digital Delivery Model (No Physical Shipping)</span>
            </div>
            <p>
              <strong>We do not ship physical products.</strong> All deliverables (source code, digital contracts, deployment links, and documentation) are delivered electronically via GitHub, cloud servers, and registered email within the project timeline agreed upon in the Scope of Work (SoW).
            </p>
            <p style={{ marginTop: '0.65rem' }}>
              Because our solutions are purely digital software assets and technical engineering services, <strong>no physical shipping charges, customs duties, or courier handling fees</strong> apply to any engagement. Shipping charges across all services are <strong>₹0.00 (Free / Digital Delivery)</strong>.
            </p>
          </div>

          <section>
            <h2>
              <span className="section-num">01.</span>
              <span>Electronic Delivery Channels & Deliverable Types</span>
            </h2>
            <p>
              All software assets, configuration files, and contractual documents are delivered through secure, verifiable electronic channels:
            </p>

            <div className="policy-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Deliverable Type</th>
                    <th>Fulfillment & Transmission Method</th>
                    <th>Access Security</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Source Code & Repositories</strong></td>
                    <td>Transferred via private GitHub / GitLab organization invite or encrypted repository transfer.</td>
                    <td>OAuth 2.0 / SSH Key restricted to client authorized developers.</td>
                  </tr>
                  <tr>
                    <td><strong>Live Cloud Deployments</strong></td>
                    <td>Configured and deployed to designated cloud infrastructure (e.g., Vercel, AWS, DigitalOcean, VPS) with live staging/production URLs.</td>
                    <td>HTTPS TLS/SSL encrypted endpoints with custom domain mapping.</td>
                  </tr>
                  <tr>
                    <td><strong>Digital Contracts & Invoices</strong></td>
                    <td>Digitally signed Statements of Work, estimates, and statutory tax invoices delivered in PDF format.</td>
                    <td>Dispatched directly to the client&apos;s registered email address.</td>
                  </tr>
                  <tr>
                    <td><strong>Technical Documentation</strong></td>
                    <td>System architecture documentation, API schemas, and deployment README manuals.</td>
                    <td>Embedded in repository root or shared via secure Notion / Google Docs.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>
              <span className="section-num">02.</span>
              <span>Delivery Timelines & Milestone Handover</span>
            </h2>
            <p>
              Delivery schedules are determined by the complexity of the project and are explicitly specified in the project&apos;s <strong>Statement of Work (SoW)</strong>:
            </p>
            <ul>
              <li><strong>Sprint & Milestone Schedules:</strong> Standard website builds and MVPs are typically delivered across 2 to 6 week milestone cycles, as agreed during initial scoping.</li>
              <li><strong>Fulfillment Milestone:</strong> A deliverable is legally deemed &quot;delivered&quot; once the staging deployment link, preview build, or repository invitation has been formally transmitted to the Client&apos;s designated email or project management channel.</li>
              <li><strong>Client-Dependent Delays:</strong> Delivery timelines are contingent upon the timely receipt of client assets (branding, copy, API credentials, third-party approvals). Any delays in receiving essential assets will automatically adjust the delivery milestone date.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">03.</span>
              <span>User Acceptance Testing (UAT) & Review Window</span>
            </h2>
            <p>
              To ensure the highest standard of software quality and client satisfaction:
            </p>
            <ul>
              <li>
                <strong>7 to 14 Calendar Day Review Period:</strong> Following milestone delivery, the Client is provided an agreed review window (standard 7 to 14 calendar days) to test the build, verify functionality against the agreed specifications, and submit consolidated feedback.
              </li>
              <li>
                <strong>Defect Rectification:</strong> Any verifiable bugs, layout discrepancies, or functional deviations from the signed SoW reported during this review window will be resolved promptly at no additional cost.
              </li>
              <li>
                <strong>Out-of-Scope Revisions:</strong> Functional enhancements, new feature requests, or scope expansions requested during or after the review window will be scoped and estimated as a separate milestone or maintenance agreement.
              </li>
              <li>
                <strong>Deemed Acceptance:</strong> If no written feedback or defect reports are received within 14 calendar days of delivery notification, the deliverable shall be deemed accepted and approved in full.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">04.</span>
              <span>Post-Delivery Support & Maintenance</span>
            </h2>
            <p>
              Standard project handovers include <strong>14 to 30 calendar days of complimentary post-deployment warranty support</strong> to address unforeseen server errors or runtime regressions. Ongoing retainer plans for regular database backups, security patches, and feature upgrades are available under separate service level agreements.
            </p>
          </section>

          <section>
            <h2>
              <span className="section-num">05.</span>
              <span>Delivery Inquiries & Handover Assistance</span>
            </h2>
            <p>
              If you have any questions regarding access to your repository, deployment credentials, or invoice PDF, please contact us directly:
            </p>
            <ul>
              <li><strong>Official Support Email:</strong> <a href="mailto:admin@disanalam.me">admin@disanalam.me</a></li>
              <li><strong>Direct Portal:</strong> Submit an inquiry via the <a href="/contact">Contact Page</a> for immediate technical assistance.</li>
            </ul>
          </section>
        </div>
      </article>
    </LegalLayout>
  );
};

export default DeliveryPolicy;
