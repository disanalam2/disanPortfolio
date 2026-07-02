import React from 'react';
import CardActionMenu from '../../components/admin/CardActionMenu';

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

      <div className="certificate-card-body">
        <div className="certificate-image">
          {certificate.image ? (
            <img src={certificate.image} alt={`${certificate.title} certificate`} />
          ) : (
            <div className="no-image-placeholder">No Image</div>
          )}
        </div>

        <div className="certificate-copy">
          <div className="card-top">
            <span className="certificate-title">{certificate.title}</span>
            <span className="certificate-date">{certificate.issue_date}</span>
          </div>
          <p className="certificate-issuer">{certificate.issuer}</p>
          <p className="certificate-description">{certificate.description}</p>
          {certificate.href && (
            <a className="certificate-link" href={certificate.href} target="_blank" rel="noreferrer">
              View credential
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default CertificateCard;