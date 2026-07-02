import React from 'react';

/**
 * Reusable Section Title component
 * @param {Object} props
 * @param {string} props.title - The main title text
 * @param {string} [props.highlight] - Text to highlight with gradient
 * @param {string} [props.className] - Additional classes
 */
const SectionTitle = ({ title, highlight, className = '' }) => {
  return (
    <h2 className={`section-title animate-fade-up ${className}`.trim()}>
      {highlight && <span>{highlight}</span>}
      {highlight ? ` ${title}` : title}
    </h2>
  );
};

export default SectionTitle;
