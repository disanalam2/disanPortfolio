import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const updateOrCreateMeta = (attrName, attrValue, content) => {
  if (!content || typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

const updateOrCreateLink = (rel, href) => {
  if (!href || typeof document === 'undefined') return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (element) {
    element.setAttribute('href', href);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
};

const SEO = ({ 
  title = "Disan Alam | Full-Stack Systems Architect & AI Business Solutions", 
  description = "Portfolio of Disan Alam, Full-Stack Systems Architect & AI Business Solutions Consultant. Specializing in deep industry discovery, bespoke web engineering, Agentic AI, custom RAG integrations, and AWS cloud systems.", 
  keywords = "Disan Alam, Full Stack Systems Architect, AI Business Solutions, Agentic AI, Custom RAG, Business Process Automation, React Developer, Next.js, Node.js, Express.js, AWS Cloud, Ranchi, India", 
  url = "https://www.disanalam.me/",
  image = "https://www.disanalam.me/og-image.jpg",
  schema = null
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (title) document.title = title;
    updateOrCreateMeta('name', 'description', description);
    updateOrCreateMeta('name', 'keywords', keywords);
    updateOrCreateMeta('name', 'title', title);
    updateOrCreateLink('canonical', url);

    // Open Graph
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:url', url);
    updateOrCreateMeta('property', 'og:image', image);

    // Twitter
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:url', url);
    updateOrCreateMeta('name', 'twitter:image', image);
  }, [title, description, keywords, url, image]);

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
      <meta property="og:image:alt" content="Disan Alam - Full-Stack Systems Architect & AI Business Solutions" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Disan Alam - Full-Stack Systems Architect & AI Business Solutions" />

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
