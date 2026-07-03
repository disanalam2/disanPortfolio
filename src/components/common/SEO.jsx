import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema }) => {
  const defaultTitle = 'Disan Alam | Full-Stack Developer';
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  
  const defaultDescription = "Professional Full-Stack Web Developer and Website Developer. View my latest projects, technical skills, professional experience, and verified certificates.";
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = "Disan Alam, Full Stack Developer, Web Developer, React, Node.js";
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
