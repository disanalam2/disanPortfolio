import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Disan Alam | Full-Stack Web Developer", 
  description = "Disan Alam is a Professional Full-Stack Web Developer, Website Developer, and Software Engineer. Explore the portfolio of Disan Alam to view real-world projects and technical skills.", 
  keywords = "Disan Alam, Full Stack Developer, Web Developer, React Developer, Node.js Expert", 
  url = "https://disanalam.me/",
  image = "https://disanalam.me/banner.jpeg",
  schema = null
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical Link */}
      {url ? <link rel="canonical" href={url} /> : null}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Dynamic JSON-LD Schema for LLMs and Search Engines */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
