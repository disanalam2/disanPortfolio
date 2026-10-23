import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout from './LegalLayout';
import SEO from '../../components/common/SEO';

const RefundPolicy = () => {
  return (
    <LegalLayout activePolicy="Refund & Cancellation">
      <SEO
        title="Refund & Cancellation Policy | Disan Alam"
        description="Official Refund and Cancellation Policy of Disan Alam (disanalam.me). Clear terms on advance deposits, milestone payments, and our mandatory 5-7 working days refund turnaround time."
        url="https://disanalam.me/refund-policy"
      />

      <article className="legal-glass-card">
        <header className="policy-header">
          <span className="policy-badge">LEGAL COMPLIANCE • REFUND & CANCELLATION</span>
          <h1>Refund & Cancellation Policy</h1>
          <p className="policy-intro">
            This Refund & Cancellation Policy sets forth the terms under which refunds, project pauses, or cancellations are managed for software development, full-stack web engineering, and IT consulting services provided by Disan Alam (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) via <strong>https://disanalam.me</strong>.
          </p>
        </header>

        <div className="policy-content">
          <section>
            <h2>
              <span className="section-num">01.</span>
              <span>Nature of Custom Engineering Services</span>
            </h2>
            <p>
              Software development, code authoring, cloud deployment, and system architecture are highly specialized, bespoke intellectual services. Unlike mass-manufactured physical retail goods, software engineering requires intensive manual time allocation, technical research, and dedicated developer bandwidth. Once engineering capacity is scheduled and executed, it cannot be recovered or restocked.
            </p>
          </section>

          <section>
            <h2>
              <span className="section-num">02.</span>
              <span>Onboarding Advance & Milestone Deposits</span>
            </h2>
            <p>
              To confirm a project and reserve development sprints on our calendar, an onboarding advance (typically 25% to 30% of the total project estimate, or as defined in the signed Statement of Work) is required before kickoff:
            </p>
            <ul>
              <li>
                <strong>Non-Refundable Advance Deposit:</strong> The onboarding advance is <strong>strictly non-refundable</strong> once work commences, preliminary discovery sessions take place, or initial architecture and wireframes are drafted. This deposit covers upfront planning, resource allocation, and opportunity costs incurred by declining other incoming engagements.
              </li>
              <li>
                <strong>Milestone Payment Structure:</strong> Projects are segmented into verifiable milestones (e.g., UI/UX approval, functional staging build, production deployment). Each milestone is reviewed and formally approved by the Client before proceeding to the subsequent phase.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">03.</span>
              <span>Project Cancellation by the Client</span>
            </h2>
            <p>
              If the Client elects to terminate, pause, or indefinitely delay an ongoing engagement for any reason:
            </p>
            <ul>
              <li>
                <strong>No Refund for Completed or In-Progress Milestones:</strong> All fees paid for milestones that have been completed, demonstrated, or are actively in progress up to the date of written cancellation notice are strictly non-refundable.
              </li>
              <li>
                <strong>Deliverable Handover:</strong> Upon cancellation, the Client is entitled to receive all completed source code, design assets, and documentation associated with milestones that have been paid for in full.
              </li>
              <li>
                <strong>Outstanding Balances:</strong> Any accrued hours or completed deliverables not yet invoiced will be billed pro-rata and must be settled prior to asset handover.
              </li>
            </ul>
          </section>

          {/* Mandatory Payment Gateway Refund Timeline Box */}
          <div className="callout-box">
            <div className="callout-title">
              <span aria-hidden="true">⏱️</span>
              <span>Mandatory Gateway Refund Timeline (5 to 7 Working Days)</span>
            </div>
            <p>
              In the rare event that a refund is warranted and mutually approved in writing (such as a verified technical billing error, accidental duplicate transaction, or cancellation agreed prior to any work commencement):
            </p>
            <p style={{ marginTop: '0.65rem' }}>
              <strong>The eligible refund amount will be initiated and credited back to the customer&apos;s original payment source (Bank Account, UPI ID, or Credit/Debit Card) within 5 to 7 working days</strong> from the date of refund approval, in full compliance with Reserve Bank of India (RBI) guidelines and standard payment aggregator (Razorpay / Cashfree) turnaround schedules.
            </p>
          </div>

          <section>
            <h2>
              <span className="section-num">04.</span>
              <span>Cancellation by the Developer</span>
            </h2>
            <p>
              In the extremely unlikely event that the Developer must terminate a project prior to completion due to unforeseen personal emergencies, force majeure, or ethical conflicts:
            </p>
            <ul>
              <li>The Developer will deliver all work-in-progress source code, architectural assets, and documentation completed to date.</li>
              <li>A fair, pro-rata refund will be issued for any unfulfilled portion of the current milestone that was paid for in advance, processed within the standard 5 to 7 working days window.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">05.</span>
              <span>Billing Discrepancies & Duplicate Transactions</span>
            </h2>
            <p>
              If you notice any billing discrepancy, duplicate charge, or clerical error on your invoice or payment receipt:
            </p>
            <ul>
              <li>Notify us in writing within <strong>7 calendar days</strong> of transaction date by emailing <a href="mailto:admin@disanalam.me">admin@disanalam.me</a>.</li>
              <li>Include your full name, invoice number, payment gateway transaction reference ID (from Razorpay/Cashfree), and the date of deduction.</li>
              <li>Upon verification, duplicate charges are immediately reversed to the originating bank account/UPI ID within 5 to 7 working days.</li>
            </ul>
          </section>

          <section>
            <h2>
              <span className="section-num">06.</span>
              <span>Digital Service Delivery & Cross-Policy Reference</span>
            </h2>
            <p>
              Please note that because all our services are 100% digital, there is no return of physical merchandise. For complete details on how source code, live deployments, and credentials are electronically delivered, please refer to our{' '}
              <Link to="/delivery-policy" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>
                Service Delivery & Shipping Policy →
              </Link>
            </p>
          </section>
        </div>
      </article>
    </LegalLayout>
  );
};

export default RefundPolicy;
