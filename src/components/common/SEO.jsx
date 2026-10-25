import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Disan Alam | Full-Stack Web Developer & Software Engineer", 
  description = "Portfolio of Disan Alam, Full-Stack Web Developer & Software Engineer specializing in React, Next.js, Node.js, and AWS cloud architecture. Delivering high-performance web applications with transparent milestone pricing models.", 
  keywords = "Disan Alam, Full Stack Developer, Software Engineer, React Developer, Next.js, Node.js, Express.js, AWS EC2, Web Development Services, Freelance Web Developer India, Tech Partner", 
  url = "https://disanalam.me/",
  image = "https://disanalam.me/og-image.jpg",
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

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Disan Alam" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Disan Alam - Full-Stack Web Developer & Software Engineer" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Disan Alam - Full-Stack Web Developer & Software Engineer" />

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
