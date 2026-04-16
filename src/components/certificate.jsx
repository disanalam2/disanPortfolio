import '../styles/certificate.scss';
import { motion } from 'framer-motion';

const certificates = [
  {
    title: 'Introduction to Software Engineering',
    issuer: 'Coursera,IBM',
    date: 'April 13 2026',
    description: 'Completed a hands-on certification covering React, Node.js, Express, MongoDB, and deployment best practices.',
    href: 'https://coursera.org/share/7c193bd5721af5568da0387e19c0cc88',
    image: './introduction-to-software-engineering.jpeg'
  }
];

const Certificate = () => {
  return (
    <motion.section
      className="certificate-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="section-header">
        <h2>Certificates</h2>
        <p>Verified credentials and training that show the tools, frameworks, and workflows I use every day.</p>
      </div>
      <div className="certificate-grid">
        {certificates.map((certificate, index) => (
          <article className={`certificate-card ${index % 2 === 1 ? 'reverse' : ''}`} key={certificate.title}>
            <div className="certificate-card-body">
              <div className="certificate-image">
                <img src={certificate.image} alt={`${certificate.title} certificate`} />
              </div>
              <div className="certificate-copy">
                <div className="card-top">
                  <span className="certificate-title">{certificate.title}</span>
                  <span className="certificate-date">{certificate.date}</span>
                </div>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-description">{certificate.description}</p>
                <a
                  className="certificate-link"
                  href={certificate.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  View credential
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default Certificate;
