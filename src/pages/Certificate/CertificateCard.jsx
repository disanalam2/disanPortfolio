import React from 'react';
import CardActionMenu from '../../components/admin/CardActionMenu';
import Button from '../../components/ui/Button';

const CertificateCard = ({ certificate, isEditingPage, onEdit, onDelete }) => {
  return (
    <>
      {isEditingPage && (
        <CardActionMenu 
          onEdit={onEdit} 
          onDelete={onDelete} 
          showDragHandle={true} 
        />
      )}

      <h3 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
        {certificate.title}
      </h3>

      {certificate.image && (
        <div style={{ width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <img src={certificate.image} alt={`Certificate: ${certificate.title}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h4 style={{ color: 'var(--accent-color)', fontWeight: '700', marginBottom: '10px' }}>
        {certificate.issuer}
      </h4>

      <p className="desc" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.98rem', lineHeight: '1.75', flexGrow: '1' }}>
        {certificate.description}
      </p>

      <span style={{ display: 'block', fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
        Issued: {certificate.issue_date}
      </span>

      {certificate.href && (
        <div className="certificate-actions" style={{ marginTop: 'auto' }}>
          <Button asLink href={certificate.href} target="_blank" rel="noopener noreferrer" variant="primary">
            View Credential
          </Button>
        </div>
      )}
    </>
  );
};

export default CertificateCard;