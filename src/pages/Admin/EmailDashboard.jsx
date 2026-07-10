import React, { useState, useEffect, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, Send, CheckCircle, Clock, Edit, X,
  Building2, MapPin, Mail, Phone, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/authContext';
import { API_URL, BASE_URL } from '../../services/api';
import './EmailDashboard.scss'; // Inject styles here

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [emailDraftText, setEmailDraftText] = useState('');
  const [sendingId, setSendingId] = useState(null);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'settings' | 'analytics'
  const [emailAccounts, setEmailAccounts] = useState([]);
  const [newEmailForm, setNewEmailForm] = useState({ email: '', password: '', host: 'smtp.zoho.in', port: 465 });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [toasts, setToasts] = useState([]); // Custom toast notifications
  const [inboxMessages, setInboxMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [scrapeForm, setScrapeForm] = useState({ niche: '', location: '' });
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState('');
  
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const exportToCSV = () => {
    if (!leads || leads.length === 0) {
      alert("No leads to export!");
      return;
    }
    const headers = ['Business Name', 'Niche', 'Email', 'Phone', 'Address', 'Type', 'Status'];
    const rows = leads.map(l => [
      `"${(l.business_name || '').replace(/"/g, '""')}"`,
      `"${(l.niche || '').replace(/"/g, '""')}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${(l.address || '').replace(/"/g, '""')}"`,
      `"${l.lead_type || ''}"`,
      `"${l.status || ''}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Leads_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    
    // Set up WebSockets for real-time CRM updates
    const socket = io(API_URL, { withCredentials: true });
    
    socket.on('lead_notification', (data) => {
        // Add toast
        const id = Date.now();
        setToasts(prev => [...prev, { id, message: data.message, type: data.type }]);
        // Remove toast after 5s
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
        // Refresh leads list to show updated status
        fetchLeads();
    });

    fetchLeads();
    fetchEmailAccounts();
    fetchAnalytics();
    fetchInbox();

    return () => {
        socket.disconnect();
    };
  }, [isAdmin, navigate]);

  async function fetchAnalytics() {
    try {
      const res = await axios.get(`${BASE_URL}/analytics`);
      setAnalyticsData(res.data);
    } catch (error) {
      console.error('Failed to fetch analytics', error);
    }
  };

  async function fetchInbox() {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      const res = await axios.get(`${BASE_URL}/inbox`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInboxMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  async function markMessageAsRead(id) {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      await axios.put(`${BASE_URL}/inbox/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInbox();
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchEmailAccounts() {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      const res = await axios.get(`${BASE_URL}/settings/emails`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmailAccounts(res.data);
    } catch (error) {
      console.error('Failed to fetch emails', error);
    }
  };

  async function handleAddEmail(e) {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      await axios.post(`${BASE_URL}/settings/emails`, newEmailForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewEmailForm({ email: '', password: '', host: 'smtp.zoho.in', port: 465 });
      fetchEmailAccounts();
      alert('Email account added successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add email');
    }
  };

  async function handleDeleteEmail(id) {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      await axios.delete(`${BASE_URL}/settings/emails/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmailAccounts();
    } catch (error) {
      alert('Failed to delete email');
    }
  };

  async function fetchLeads() {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      if (!token) return navigate('/');

      const res = await axios.get(`${BASE_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data);
    } catch (error) {
      console.error('Failed to fetch leads', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const openModal = (lead) => {
    setSelectedLead(lead);
    
    if (lead.status === 'follow_up_1_ready') {
      setEmailDraftText(lead.follow_up_1_draft || '');
    } else if (lead.status === 'follow_up_2_ready') {
      setEmailDraftText(lead.follow_up_2_draft || '');
    } else {
      setEmailDraftText(lead.email_draft || '');
    }
  };

  const closeModal = () => {
    setSelectedLead(null);
    setEmailDraftText('');
  };

  const scheduleEmail = async (id, isImmediate = false) => {
    const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
    if (!token) return;

    setSendingId(id);
    try {
      const isFollowUp1 = selectedLead.status === 'follow_up_1_ready';
      const isFollowUp2 = selectedLead.status === 'follow_up_2_ready';
      const isFollowUp = isFollowUp1 || isFollowUp2;
      
      
      let endpoint = `${BASE_URL}/leads/${id}/schedule`;
      let payload = { email_draft: emailDraftText };
      let newStatus = 'approved_scheduled';
      
      if (isImmediate) {
        endpoint = `${BASE_URL}/leads/${id}/send`;
        newStatus = 'emailed';
      } else if (isFollowUp) {
        endpoint = `${BASE_URL}/leads/${id}/followup`;
        payload = { follow_up_draft: emailDraftText, step: isFollowUp1 ? 1 : 2 };
        newStatus = 'follow_up_scheduled';
      }

      await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      closeModal();
      alert(isImmediate ? 'Email sent successfully!' : 'Email approved and scheduled for 9AM-11AM (Local Time)!');
    } catch (error) {
      console.error('Error sending/scheduling email', error);
      alert('Failed to process. Check SMTP settings in backend.');
    } finally {
      setSendingId(null);
    }
  };

  const handlePublishAward = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      await axios.post(`${BASE_URL}/leads/${id}/publish-award`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(leads.map(l => l.id === id ? { ...l, is_award_public: 1 } : l));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, is_award_public: 1 });
      }
      alert('PR Award is now public! The client can now view it.');
    } catch (error) {
      console.error('Error publishing award:', error);
      alert('Failed to publish award.');
    }
  };

  const handleViewPDF = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      const response = await axios.get(`${BASE_URL}/leads/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error fetching PDF:', error);
      alert('Failed to generate or fetch PDF.');
    }
  };

  const handleScrapeSubmit = async (e) => {
    e.preventDefault();
    if (!scrapeForm.niche || !scrapeForm.location) return;
    setIsScraping(true);
    setScrapeResult('Searching Google Places and Auditing Websites... This may take a minute...');
    
    try {
      const token = sessionStorage.getItem('adminToken')?.replace(/^"(.*)"$/, '$1');
      const res = await axios.post(`${BASE_URL}/scraper/start`, scrapeForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScrapeResult(res.data.message);
      // Refresh leads list to show newly scraped leads
      fetchLeads();
      // Switch back to leads tab to see them
      setTimeout(() => setActiveTab('leads'), 3000);
    } catch (err) {
      console.error(err);
      setScrapeResult('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="email-dashboard">
      
      <header className="dash-header">
        <div className="header-left">
          <div className="icon-box">
            <Building2 />
          </div>
          <h1>AutoLeadGen Dashboard</h1>
          <div className="dash-tabs">
            <button 
              onClick={() => startTransition(() => setActiveTab('scraper'))} 
              className={activeTab === 'scraper' ? 'active' : ''}
              style={{ background: 'linear-gradient(45deg, #f59e0b, #d97706)', border: 'none', color: '#fff', fontWeight: 'bold' }}
            >
              🚀 Scraper Tool
            </button>
            <button 
              onClick={() => startTransition(() => setActiveTab('leads'))} 
              className={activeTab === 'leads' ? 'active' : ''}
            >
              Leads
            </button>
            <button 
              onClick={() => startTransition(() => setActiveTab('settings'))} 
              className={activeTab === 'settings' ? 'active' : ''}
            >
              Settings
            </button>
            <button 
              onClick={() => startTransition(() => setActiveTab('inbox'))}
              className={activeTab === 'inbox' ? 'active' : ''}
            >
              📥 Unified Inbox
              {inboxMessages.filter(m => !m.is_read).length > 0 && (
                  <span style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '12px',
                      marginLeft: '5px'
                  }}>
                      {inboxMessages.filter(m => !m.is_read).length}
                  </span>
              )}
            </button>
            <button 
              onClick={() => startTransition(() => setActiveTab('analytics'))} 
              className={activeTab === 'analytics' ? 'active' : ''}
            >
              Analytics 📈
            </button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        {activeTab === 'scraper' && (
          <div className="scraper-container" style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2>Google Places & Website Auditor</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter a niche and location. We will scrape Google Places, check if they have a website, scrape their email, and audit their website speed and SEO automatically.</p>
            
            <form onSubmit={handleScrapeSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="e.g. Dentists, Plumbers" 
                value={scrapeForm.niche}
                onChange={e => setScrapeForm({...scrapeForm, niche: e.target.value})}
                style={{ flex: 1, minWidth: '200px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-hover)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                required
              />
              <input 
                type="text" 
                placeholder="e.g. New York, London" 
                value={scrapeForm.location}
                onChange={e => setScrapeForm({...scrapeForm, location: e.target.value})}
                style={{ flex: 1, minWidth: '200px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-hover)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                required
              />
              <button 
                type="submit" 
                disabled={isScraping}
                style={{ padding: '12px 24px', background: isScraping ? '#555' : 'var(--accent-color)', color: '#000', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: isScraping ? 'not-allowed' : 'pointer' }}
              >
                {isScraping ? 'Auditing Websites... ⏳' : 'Start Scraping 🚀'}
              </button>
            </form>
            
            {scrapeResult && (
              <div style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
                {scrapeResult}
              </div>
            )}
          </div>
        )}

        {activeTab === 'leads' && (
          <>
            <div className="dash-toolbar">
              <h2>Collected Leads</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  onClick={exportToCSV}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Download CSV
                </button>
                <div className="search-box">
                  <Search />
                  <input 
                    type="text" 
                    placeholder="Search business..." 
                  />
                </div>
              </div>
            </div>

            <div className="dash-table-container">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Business Info</th>
                      <th>Contact</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading leads...</td>
                      </tr>
                    ) : leads.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                          No leads found. Ensure the background worker is running.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <div className="lead-name">
                              {lead.business_name}
                              {lead.is_hot === 1 && (
                                <span className="badge fire" style={{backgroundColor: '#ef4444', color: '#fff', marginLeft: '8px', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'}}>🔥 HOT LEAD</span>
                              )}
                              {lead.opened === 1 && lead.is_hot !== 1 && (
                                <span className="badge fire" style={{marginLeft: '8px', fontSize: '12px'}}>👀 Opened</span>
                              )}
                              {lead.clicked === 1 && (
                                <span className="badge target" style={{marginLeft: '8px', fontSize: '12px'}}>🖱️ Clicked</span>
                              )}
                              {lead.conversion_type && (
                                <span className="badge target" style={{marginLeft: '8px', fontSize: '12px'}}>🎯 Replied</span>
                              )}
                            </div>
                            <div className="lead-niche">{lead.niche}</div>
                            {lead.website && (
                              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                  🌐 {lead.website}
                                </a>
                              </div>
                            )}
                            <div className="lead-meta" style={{ marginTop: '4px' }}>
                              <MapPin size={12} /> {lead.address || 'No address provided'}
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <div><Mail size={14} /> {lead.email}</div>
                              {lead.phone && <div><Phone size={14} /> {lead.phone}</div>}
                            </div>
                          </td>
                          <td>
                            <span className={`type-badge ${lead.lead_type === 'bad_website' ? 'bad' : 'no'}`}>
                              {lead.lead_type === 'bad_website' ? 'Bad Website' : 'No Website'}
                            </span>
                            {lead.website_issues && (() => {
                              try {
                                const audit = JSON.parse(lead.website_issues);
                                return (
                                  <div style={{ fontSize: '11px', marginTop: '6px', color: '#94a3b8' }}>
                                    {audit.speed_score !== null && audit.speed_score !== undefined && (
                                      <span style={{ marginRight: '6px', color: audit.speed_score > 80 ? '#10b981' : audit.speed_score > 50 ? '#f59e0b' : '#ef4444', fontWeight: 'bold' }}>
                                        Speed: {audit.speed_score}
                                      </span>
                                    )}
                                    {audit.lcp && audit.lcp !== 'N/A' && (
                                      <span style={{ marginRight: '6px', color: '#94a3b8' }}>LCP: <span style={{color: '#f8fafc'}}>{audit.lcp}</span></span>
                                    )}
                                    {audit.mobile_responsive === false && <span style={{ color: '#ef4444', marginRight: '6px' }} title="Not Mobile Responsive">📱❌</span>}
                                    {audit.ssl_issue === true && <span style={{ color: '#ef4444', marginRight: '6px' }} title="SSL Error">🔒❌</span>}
                                    {audit.missing_seo === true && <span style={{ color: '#ef4444' }} title="Missing SEO">🔍❌</span>}
                                  </div>
                                )
                              } catch (e) {
                                return null;
                              }
                            })()}
                          </td>
                          <td>
                            <span className={`status-badge ${
                              lead.status === 'replied' ? 'replied'
                              : lead.status === 'emailed' ? 'emailed' 
                              : lead.status.includes('scheduled') ? 'scheduled'
                              : lead.status.includes('ready') ? 'ready'
                              : 'default'
                            }`}>
                              {lead.status === 'emailed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                              {lead.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              onClick={() => openModal(lead)}
                              className="action-btn"
                            >
                              <Edit size={20} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="settings-grid">
            <div className="settings-card">
              <h3><Mail style={{display:'inline', verticalAlign:'middle', marginRight:'8px'}} size={20} color="#3b82f6"/> Add New Account</h3>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>
                Add your multiple custom domain emails here. The system will automatically rotate through them when sending cold emails to keep your domain safe and avoid spam filters.
              </p>
              <form onSubmit={handleAddEmail}>
                <div>
                  <label>Email Address</label>
                  <input required type="email" placeholder="contact@disanalam.me" value={newEmailForm.email} onChange={e => setNewEmailForm({...newEmailForm, email: e.target.value})} />
                </div>
                <div>
                  <label>App Password / Password</label>
                  <input required type="password" value={newEmailForm.password} onChange={e => setNewEmailForm({...newEmailForm, password: e.target.value})} />
                </div>
                <div className="form-row">
                  <div>
                    <label>SMTP Host (Zoho)</label>
                    <input type="text" placeholder="smtp.zoho.in" value={newEmailForm.host} onChange={e => setNewEmailForm({...newEmailForm, host: e.target.value})} />
                  </div>
                  <div>
                    <label>Port</label>
                    <input type="number" value={newEmailForm.port} onChange={e => setNewEmailForm({...newEmailForm, port: parseInt(e.target.value)})} />
                  </div>
                </div>
                <button type="submit" className="submit-btn">Connect Email</button>
              </form>
            </div>

            <div className="settings-card">
              <h3>Connected Accounts</h3>
              <div className="email-list">
                {emailAccounts.length === 0 ? (
                  <div style={{color: 'var(--text-secondary)', fontSize: '0.85rem'}}>No email accounts connected yet.</div>
                ) : (
                  emailAccounts.map(account => (
                    <div key={account.id} className="email-item">
                      <div>
                        <div className="email-addr">{account.email}</div>
                        <div className="email-stats">
                          Sent Today: <span className={account.daily_sent_count >= 40 ? 'danger' : 'safe'}>{account.daily_sent_count}</span> / 40
                        </div>
                      </div>
                      <button onClick={() => handleDeleteEmail(account.id)} className="delete-btn">
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div>
            <h2 style={{fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
              📥 Unified Master Inbox
            </h2>
            <div style={{ display: 'flex', gap: '20px', height: '600px' }}>
                <div style={{ flex: '1', backgroundColor: '#1e293b', borderRadius: '12px', overflowY: 'auto' }}>
                    {inboxMessages.length === 0 ? (
                        <p style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No emails found.</p>
                    ) : (
                        inboxMessages.map(msg => (
                            <div 
                                key={msg.id} 
                                onClick={() => { setSelectedMessage(msg); if(!msg.is_read) markMessageAsRead(msg.id); }}
                                style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #334155',
                                    cursor: 'pointer',
                                    backgroundColor: selectedMessage?.id === msg.id ? '#334155' : (msg.is_read ? 'transparent' : 'rgba(59, 130, 246, 0.1)'),
                                    borderLeft: !msg.is_read ? '4px solid #3b82f6' : '4px solid transparent'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <strong style={{ color: '#f8fafc', fontSize: '14px' }}>{msg.sender_email}</strong>
                                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>{new Date(msg.received_at).toLocaleDateString()}</span>
                                </div>
                                <div style={{ color: msg.is_read ? '#cbd5e1' : '#f8fafc', fontWeight: msg.is_read ? 'normal' : 'bold', fontSize: '14px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {msg.subject}
                                </div>
                                <div style={{ color: '#64748b', fontSize: '12px' }}>To: {msg.account_email}</div>
                            </div>
                        ))
                    )}
                </div>
                <div style={{ flex: '2', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', overflowY: 'auto' }}>
                    {selectedMessage ? (
                        <div>
                            <h3 style={{ margin: '0 0 10px 0', color: '#f8fafc' }}>{selectedMessage.subject}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '15px' }}>
                                <div>
                                    <span style={{ color: '#94a3b8', fontSize: '12px', display: 'block' }}>From:</span>
                                    <strong style={{ color: '#f8fafc' }}>{selectedMessage.sender_email}</strong>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ color: '#94a3b8', fontSize: '12px', display: 'block' }}>Received On:</span>
                                    <strong style={{ color: '#f8fafc' }}>{selectedMessage.account_email}</strong>
                                </div>
                            </div>
                            <div style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                {selectedMessage.body}
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            Select a message to read
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && analyticsData && (
          <div>
            <h2 style={{fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <BarChart2 color="#3b82f6" /> Campaign Analytics
            </h2>

            <div className="analytics-grid">
              <div className="kpi-card">
                <div className="kpi-label">Total Leads Found</div>
                <div className="kpi-value">{analyticsData.kpi.total_leads}</div>
              </div>
              <div className="kpi-card blue">
                <div className="kpi-label">Emails Sent</div>
                <div className="kpi-value blue-text">{analyticsData.kpi.total_sent}</div>
              </div>
              <div className="kpi-card red">
                <div className="kpi-label">Total Opens (Hot Leads)</div>
                <div className="kpi-value red-text">{analyticsData.kpi.total_opened}</div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>A/B Test Open Rates (%)</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Version A (Formal)', openRate: parseFloat(analyticsData.ab_testing.version_a.rate) },
                      { name: 'Version B (Casual)', openRate: parseFloat(analyticsData.ab_testing.version_b.rate) }
                    ]}>
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="openRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3>Lead Types Breakdown</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.lead_types}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analyticsData.lead_types.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#f59e0b'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6'}}></div><span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>No Website</span></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b'}}></div><span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Bad Website</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedLead && (
        <div className="dash-modal-overlay">
          <div className="dash-modal">
            
            <div className="modal-header">
              <div>
                <h3>
                  <Mail size={20} color="#3b82f6" />
                  Review {selectedLead.status.includes('ready') ? 'Follow Up' : 'Email'} for {selectedLead.business_name}
                </h3>
                <p>
                  Recipient: {selectedLead.email || 'N/A'} | TZ: {selectedLead.timezone || 'Local'}
                  {selectedLead.phone && (
                    <span style={{ marginLeft: '10px' }}>
                      | 📱 Phone: {selectedLead.phone} 
                      <a href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ marginLeft: '5px', color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
                        (WhatsApp)
                      </a>
                    </span>
                  )}
                </p>
              </div>
              <button onClick={closeModal} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="editor-section">
                {selectedLead.lead_type === 'bad_website' && selectedLead.website_issues && (
                  <div className="info-box orange" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                    <h4 style={{ color: '#f59e0b', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BarChart2 size={16} /> Website Audit Report
                    </h4>
                    {(() => {
                      try {
                        const audit = typeof selectedLead.website_issues === 'string' ? JSON.parse(selectedLead.website_issues) : selectedLead.website_issues;
                        return (
                          <>
                            {audit.is_free_domain && (
                              <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', padding: '10px', borderRadius: '6px', marginBottom: '10px', color: '#fca5a5', fontSize: '0.85rem' }}>
                                <strong>⚠️ Hot Lead Alert:</strong> This business is using an unprofessional free domain.
                              </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', color: '#e2e8f0' }}>
                              <div><strong>Speed Score:</strong> <span style={{ color: audit.speed_score > 80 ? '#10b981' : audit.speed_score > 50 ? '#f59e0b' : '#ef4444' }}>{audit.speed_score ? Math.round(audit.speed_score) + '/100' : 'N/A'}</span></div>
                              <div><strong>LCP (Load Time):</strong> {audit.lcp || 'N/A'}</div>
                              <div><strong>SEO Missing:</strong> {audit.missing_seo ? <span style={{color: '#ef4444'}}>Yes ❌</span> : <span style={{color: '#10b981'}}>No ✅</span>}</div>
                              <div><strong>SSL (HTTPS):</strong> {audit.ssl_issue ? <span style={{color: '#ef4444'}}>Broken ❌</span> : <span style={{color: '#10b981'}}>Secure ✅</span>}</div>
                            </div>
                          </>
                        );
                      } catch (e) {
                        return <p style={{ margin: 0 }}>{selectedLead.website_issues}</p>;
                      }
                    })()}
                  </div>
                )}
                {selectedLead.social_media_context && (
                  <div className="info-box blue">
                    <h4>Social Media Context:</h4>
                    <p>{selectedLead.social_media_context}</p>
                  </div>
                )}
                {selectedLead.intent_analysis && (
                  <div className="info-box purple" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                    <h4 style={{ color: '#a855f7', margin: '0 0 5px 0' }}>🕵️ Deep-Dive Intent Analysis:</h4>
                    <p style={{ margin: 0, color: '#f8fafc', fontSize: '0.9rem' }}>{selectedLead.intent_analysis}</p>
                  </div>
                )}
                {selectedLead.last_reply_text && (
                  <div className="info-box green" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                    <h4 style={{ color: '#10b981', margin: '0 0 5px 0' }}>Client Reply:</h4>
                    <p style={{ margin: 0, fontStyle: 'italic', color: '#f8fafc' }}>"{selectedLead.last_reply_text}"</p>
                  </div>
                )}

                {/* THE INCEPTION ACTION CENTER */}
                <div className="info-box" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                  <h4 style={{ color: '#3b82f6', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⚡ Action Center (Manual Touches)
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent((selectedLead.business_name || '') + ' ' + (selectedLead.address || ''))}`}
                      target="_blank" rel="noreferrer"
                      style={{ padding: '8px 12px', backgroundColor: '#ea4335', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                    >
                      Ask on Google Q&A
                    </a>
                    
                    <a 
                      href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent((selectedLead.decision_maker_name || '') + ' ' + (selectedLead.business_name || ''))}`}
                      target="_blank" rel="noreferrer"
                      style={{ padding: '8px 12px', backgroundColor: '#0a66c2', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                    >
                      LinkedIn Ghost Touch
                    </a>
                    
                    {(selectedLead.intent_analysis?.includes('instagram.com') || selectedLead.social_media_context?.includes('instagram.com')) ? (
                       <a 
                         href={(selectedLead.intent_analysis?.match(/https:\/\/www\.instagram\.com\/[^\s]+/)?.[0] || 'https://www.instagram.com/')}
                         target="_blank" rel="noreferrer"
                         style={{ padding: '8px 12px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                       >
                         Insta Soft Touch
                       </a>
                    ) : (
                       <a 
                         href={`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(selectedLead.business_name)}`}
                         target="_blank" rel="noreferrer"
                         style={{ padding: '8px 12px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                       >
                         Find on Insta
                       </a>
                    )}
                    
                    <a 
                      href={`/awards/${selectedLead.uuid}?preview=true`}
                      target="_blank" rel="noreferrer"
                      style={{ padding: '8px 12px', backgroundColor: '#fbbf24', color: '#000', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                    >
                      Preview PR Page
                    </a>
                    
                    <a 
                      href={`/pitch/${selectedLead.uuid}?preview=true`}
                      target="_blank" rel="noreferrer"
                      style={{ padding: '8px 12px', backgroundColor: '#8b5cf6', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                    >
                      ▶️ Preview Video Audit
                    </a>
                    
                    {!selectedLead.is_award_public ? (
                      <button 
                        onClick={() => handlePublishAward(selectedLead.id)}
                        style={{ padding: '8px 12px', backgroundColor: '#10b981', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                      >
                        ✅ Publish PR Award
                      </button>
                    ) : (
                      <span style={{ padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid #10b981', color: '#10b981', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        ✅ PR is Public
                      </span>
                    )}
                  </div>
                </div>

                {/* Website Info & Audit Summary */}
                {selectedLead.website && (
                  <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#60a5fa' }}>Website Details</h4>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem' }}>
                      <strong>URL: </strong> 
                      <a href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                        {selectedLead.website}
                      </a>
                    </p>
                    
                    {selectedLead.website_issues && (() => {
                      try {
                        const audit = JSON.parse(selectedLead.website_issues);
                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', marginTop: '10px' }}>
                            {audit.speed_score !== null && audit.speed_score !== undefined && (
                              <div style={{ background: '#1e293b', padding: '6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                <span style={{ color: '#94a3b8' }}>Speed:</span> <strong style={{ color: audit.speed_score > 80 ? '#10b981' : audit.speed_score > 50 ? '#f59e0b' : '#ef4444' }}>{audit.speed_score}/100</strong>
                              </div>
                            )}
                            {audit.lcp && audit.lcp !== 'N/A' && (
                              <div style={{ background: '#1e293b', padding: '6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                <span style={{ color: '#94a3b8' }}>LCP:</span> <strong style={{ color: '#f8fafc' }}>{audit.lcp}</strong>
                              </div>
                            )}
                            <div style={{ background: '#1e293b', padding: '6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                              <span style={{ color: '#94a3b8' }}>Mobile:</span> <strong>{audit.mobile_responsive ? '✅ Yes' : '❌ No'}</strong>
                            </div>
                            <div style={{ background: '#1e293b', padding: '6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                              <span style={{ color: '#94a3b8' }}>SSL:</span> <strong>{audit.ssl_issue ? '❌ Error' : '✅ Safe'}</strong>
                            </div>
                            <div style={{ background: '#1e293b', padding: '6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                              <span style={{ color: '#94a3b8' }}>SEO:</span> <strong>{audit.missing_seo ? '❌ Missing' : '✅ Good'}</strong>
                            </div>
                          </div>
                        );
                      } catch (e) {
                        return null;
                      }
                    })()}
                  </div>
                )}

                <label>Email Body (HTML/Text format)</label>
                <textarea 
                  value={emailDraftText}
                  onChange={(e) => setEmailDraftText(e.target.value)}
                />
              </div>
              
              {selectedLead.screenshot_url && (
                <div className="preview-section">
                  <h4>Attachment: Visual Proof</h4>
                  <div className="img-wrapper">
                    <img src={selectedLead.screenshot_url} alt="Website Screenshot" />
                  </div>
                  <p>This snapshot will be embedded in the email.</p>
                </div>
              )}
              {selectedLead.lead_type === 'bad_website' && (
                <div className="preview-section" style={{ marginTop: '10px', backgroundColor: '#fef2f2', padding: '10px', borderLeft: '4px solid #ef4444' }}>
                  <h4 style={{ color: '#b91c1c', margin: 0 }}>📄 Auto-Attachment: Free PDF Audit</h4>
                  <p style={{ margin: '5px 0 5px 0', color: '#7f1d1d', fontSize: '0.9rem' }}>A custom PDF report detailing the website issues will be dynamically generated and attached to this email when sent.</p>
                  <button 
                    onClick={() => handleViewPDF(selectedLead.id)}
                    style={{ marginTop: '5px', padding: '6px 12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    👁️ View PDF Report
                  </button>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={closeModal} className="btn-cancel">Cancel</button>
              
              <button 
                onClick={() => scheduleEmail(selectedLead.id, true)}
                disabled={sendingId === selectedLead.id || selectedLead.status === 'emailed' || selectedLead.status.includes('scheduled')}
                className="btn-outline"
              >
                Send Immediately
              </button>

              <button 
                onClick={() => scheduleEmail(selectedLead.id, false)}
                disabled={sendingId === selectedLead.id || selectedLead.status === 'emailed' || selectedLead.status.includes('scheduled')}
                className="btn-primary"
              >
                {sendingId === selectedLead.id ? (
                  <span>Loading...</span>
                ) : (
                  <Clock size={16} />
                )}
                {selectedLead.status === 'emailed' ? 'Already Sent' : selectedLead.status.includes('scheduled') ? 'Scheduled' : 'Approve & Schedule (9AM-11AM)'}
              </button>
            </div>
            
          </div>
        </div>
      )}
      {/* Custom Toast Notifications */}
      <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9999
      }}>
          {toasts.map(toast => (
              <div key={toast.id} style={{
                  padding: '16px 24px',
                  backgroundColor: toast.type === 'reply' ? '#10b981' : (toast.type === 'open' ? '#3b82f6' : '#8b5cf6'),
                  color: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  animation: 'slideIn 0.3s ease-out'
              }}>
                  {toast.message}
              </div>
          ))}
      </div>
    </div>
  );
}
