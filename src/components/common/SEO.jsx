import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema }) => {
  const defaultTitle = 'Disan Alam | Full-Stack Developer';
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  
  const defaultDescription = "Disan Alam is a Professional Full-Stack Web Developer, Website Developer, and Software Engineer. Explore the portfolio of Disan Alam to view real-world projects, technical skills in React.js, Node.js, Express.js, and MySQL, professional experience, and verified certificates. Hire Disan Alam for top-tier custom website development services.";
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = "Disan Alam, Disan Alam Portfolio, Disan Alam Projects, Disan Alam Skills, Disan Alam Experience, Disan Alam Certificates, Full Stack Developer, Website Developer, Web Developer, Freelance Web Developer, Hire Web Developer, React Developer, Node.js Expert, Portfolio, Best Web Developer, React.js, Express.js, MySQL, Cybersecurity";
  const metaKeywords = keywords || defaultKeywords;
  
  const defaultImage = "/banner.jpeg";
  const metaImage = image || defaultImage;
  
  const defaultUrl = "https://disanalam.me/";
  const metaUrl = url ? `${defaultUrl}${url}` : defaultUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={metaUrl} />
      
      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
