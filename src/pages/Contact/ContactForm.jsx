import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWrite } from '../../hooks/Write';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';
import CustomSelect from '../../components/ui/CustomSelect';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';

const preferenceOptions = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' }
];

const subjectOptions = [
  { value: 'Option A: One-Time Handover (Full Ownership)', label: 'Option A: New Build — One-Time Handover (Full Ownership) — Starting from ₹30,000' },
  { value: 'Option B: Standard Maintenance (Tech Partner)', label: 'Option B: New Build — Standard Maintenance (Tech Partner) — Starting from ₹25,000 + ₹2,500/mo' },
  { value: 'Option C: Fully Managed & Hosted (Zero-Headache)', label: 'Option C: New Build — Fully Managed & Hosted (Zero-Headache) — Starting from ₹20,000 + ₹5,000/mo' },
  { value: 'Enterprise Custom Web App (New Build)', label: 'Enterprise Custom Scope (New Build / Multi-Platform Architecture)' },
  { value: 'Website Rebuild & Tech Stack Modernization', label: 'Website Rebuild & Tech Stack Modernization' },
  { value: 'Free Technical Performance & SEO Audit', label: 'Free Technical Performance & SEO Audit' },
  { value: 'Free System Architecture & Automation Audit', label: 'Free System Architecture & Automation Audit' },
  { value: 'Free Sales Funnel, UX & Tracking Audit', label: 'Free Sales Funnel, UX & Tracking Audit' },
  { value: 'Complete Digital Infrastructure Overhaul (Full Transformation)', label: 'Complete Digital Infrastructure Overhaul (Full Transformation)' },
  { value: 'Other', label: 'Other / Custom Inquiry' }
];

const buildOptions = [
  'Option A: One-Time Handover (Full Ownership)',
  'Option B: Standard Maintenance (Tech Partner)',
  'Option C: Fully Managed & Hosted (Zero-Headache)',
  'Enterprise Custom Web App (New Build)',
  'Website Rebuild & Tech Stack Modernization',
  'Complete Digital Infrastructure Overhaul (Full Transformation)'
];

const servicesWithOptionalUrl = [
  'Option A: One-Time Handover (Full Ownership)',
  'Option B: Standard Maintenance (Tech Partner)',
  'Option C: Fully Managed & Hosted (Zero-Headache)',
  'Enterprise Custom Web App (New Build)',
  'Complete Digital Infrastructure Overhaul (Full Transformation)',
  'Other'
];


const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

const ContactForm = () => {
  const { postData, isWriting } = useWrite();
  const location = useLocation();

  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [localNumber, setLocalNumber] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  const [requirements, setRequirements] = useState({
    agenticAi: false,
    customRag: false,
    paymentGateway: false,
    mobileRoadmap: false
  });

  const toggleRequirement = (key) => {
    setRequirements((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    preference: 'email',
    contactHandle: '', 
    subject: location.state?.subject || new URLSearchParams(location.search).get('subject') || 'Free Technical Performance & SEO Audit',
    websiteUrl: '',
    message: ''
  });

  const isBuildOption = buildOptions.includes(formData.subject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'preference') {
        newData.contactHandle = ''; // Clear handle when switching method
        setLocalNumber(''); // Clear local number state as well
      }
      if (name === 'subject' && value !== 'Other') {
        setCustomSubject('');
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalHandle = formData.contactHandle;
    
    if (formData.preference === 'whatsapp') {
      const code = getCountryCallingCode(selectedCountry);
      finalHandle = `+${code}${localNumber}`;
    }

    if ((formData.preference === 'whatsapp' || formData.preference === 'telegram') && !finalHandle) {
      alert(`Please enter your ${formData.preference === 'whatsapp' ? 'WhatsApp Number' : 'Telegram Link'}!`);
      return;
    }

    if (formData.subject === 'Other' && !customSubject.trim()) {
      alert("Please enter your custom subject!");
      return;
    }

    const selectedAddons = [];
    if (requirements.agenticAi) selectedAddons.push('Agentic AI Workflows (Autonomous task execution & intelligent business agents)');
    if (requirements.customRag) selectedAddons.push('Custom RAG Knowledge Base (AI grounded on company documents, data & records)');
    if (requirements.paymentGateway) selectedAddons.push('Payment Gateway Integration (Razorpay / Cashfree with automated webhooks)');
    if (requirements.mobileRoadmap) selectedAddons.push('Mobile App Scalability Roadmap (2–3 Months API Expansion)');

    let finalMessage = formData.message.trim();
    if (isBuildOption && selectedAddons.length > 0) {
      finalMessage += `\n\n--- Selected Project Scope & AI Requirements ---\n` + selectedAddons.map(item => `• ${item}`).join('\n');
    }

    const payload = {
      ...formData,
      subject: formData.subject === 'Other' ? customSubject.trim() : formData.subject,
      contactHandle: finalHandle,
      message: finalMessage
    };

    try {
      const response = await postData('/contact/send', payload);
      if (response.success) {
        alert("Message securely sent to Database!");
        setFormData({ 
          name: '', 
          email: '', 
          preference: 'email',
          contactHandle: '', 
          subject: 'Free Technical Performance & SEO Audit',
          websiteUrl: '',
          message: ''
        });
        setRequirements({
          agenticAi: false,
          customRag: false,
          paymentGateway: false,
          mobileRoadmap: false
        });
        setCustomSubject('');
      } else {
        alert("Server error: Message send nahi ho paya.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Backend server se connection fail ho gaya!");
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Your Name *</label>
            <InputField type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="input-label">Your Email *</label>
            <InputField type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">How should I reply to you? *</label>
            <CustomSelect 
              name="preference" 
              value={formData.preference} 
              onChange={handleChange} 
              options={preferenceOptions}
              ariaLabel="Contact Preference"
              required
            />
          </div>

          {formData.preference === 'whatsapp' && (
            <div className="form-group split-phone-wrapper">
              <label className="input-label">WhatsApp Number *</label>
              <div className="split-phone-container">
                <select 
                  className="form-select country-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  aria-label="Country Code"
                >
                  {getCountries().map(country => (
                    <option key={country} value={country}>
                      {getFlagEmoji(country)} +{getCountryCallingCode(country)}
                    </option>
                  ))}
                </select>
                <div className="local-number-input">
                  <InputField
                    type="tel"
                    name="localNumber"
                    placeholder="Your Phone Number *"
                    value={localNumber}
                    onChange={(e) => setLocalNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formData.preference === 'telegram' && (
            <div className="form-group">
              <label className="input-label">Telegram Username / Link *</label>
              <InputField 
                type="text" 
                name="contactHandle" 
                placeholder="t.me/username" 
                value={formData.contactHandle} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Subject *</label>
            <CustomSelect 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              options={subjectOptions}
              ariaLabel="Subject"
              required
            />
          </div>

          {(() => {
            const isOptional = servicesWithOptionalUrl.includes(formData.subject);
            return (
              <div className="form-group">
                <label className="input-label">
                  Website URL {isOptional ? '(Optional)' : '*'}
                </label>
                <InputField 
                  type="url" 
                  name="websiteUrl" 
                  placeholder="https://yourwebsite.com" 
                  value={formData.websiteUrl} 
                  onChange={handleChange} 
                  required={!isOptional}
                />
              </div>
            );
          })()}
        </div>

        {formData.subject === 'Other' && (
          <div className="form-group full-width-field">
            <label className="input-label">Specify Your Subject *</label>
            <InputField 
              type="text" 
              name="customSubject" 
              placeholder="e.g. Mobile App Development, Cloud Consulting, Security Audit..." 
              value={customSubject} 
              onChange={(e) => setCustomSubject(e.target.value)} 
              required
            />
          </div>
        )}

        {isBuildOption && (
          <div className="form-group full-width-field">
            <div className="requirements-scope-card">
              <div className="requirements-header">
                <span className="scope-badge">⚡ TAILOR YOUR PROJECT REQUIREMENTS</span>
                <h4 className="requirements-title">Select AI &amp; Architecture Features (Optional)</h4>
                <p className="requirements-note">
                  Pricing is <strong>Starting from</strong> for core full-stack build. Your final investment adjusts transparently based on required AI workflows, custom RAG pipelines, or specialized integrations.
                </p>
              </div>

              <div className="requirements-grid">
                <label className={`requirement-chip ${requirements.agenticAi ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={requirements.agenticAi} 
                    onChange={() => toggleRequirement('agenticAi')} 
                  />
                  <div className="chip-content">
                    <span className="chip-icon" aria-hidden="true">🤖</span>
                    <div className="chip-text">
                      <strong>Agentic AI Workflows</strong>
                      <small>Autonomous task execution &amp; smart business agents</small>
                    </div>
                  </div>
                </label>

                <label className={`requirement-chip ${requirements.customRag ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={requirements.customRag} 
                    onChange={() => toggleRequirement('customRag')} 
                  />
                  <div className="chip-content">
                    <span className="chip-icon" aria-hidden="true">📚</span>
                    <div className="chip-text">
                      <strong>Custom RAG Knowledge Base</strong>
                      <small>AI grounded on your company documents &amp; data</small>
                    </div>
                  </div>
                </label>

                <label className={`requirement-chip ${requirements.paymentGateway ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={requirements.paymentGateway} 
                    onChange={() => toggleRequirement('paymentGateway')} 
                  />
                  <div className="chip-content">
                    <span className="chip-icon" aria-hidden="true">💳</span>
                    <div className="chip-text">
                      <strong>Payment Gateway Integration</strong>
                      <small>Razorpay / Cashfree setup with automated webhooks</small>
                    </div>
                  </div>
                </label>

                <label className={`requirement-chip ${requirements.mobileRoadmap ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={requirements.mobileRoadmap} 
                    onChange={() => toggleRequirement('mobileRoadmap')} 
                  />
                  <div className="chip-content">
                    <span className="chip-icon" aria-hidden="true">📱</span>
                    <div className="chip-text">
                      <strong>Mobile App Roadmap (2–3 Mo)</strong>
                      <small>API-first design ready for future iOS &amp; Android scaling</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="form-group full-width-field">
          <label className="input-label">Project Details *</label>
          <TextAreaField name="message" placeholder="Describe your project, timeline, and goals..." rows="4" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn primary-btn" disabled={isWriting}>
          {isWriting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;