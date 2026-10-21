import React from 'react';

/**
 * Reusable Section Title component with Alabaster-Mint Cybernetic HUD styling.
 * Left-anchored to seamlessly connect with incoming circuit lines.
 * @param {Object} props
 * @param {string} props.title - The main title text
 * @param {string} [props.highlight] - Text to highlight with gradient/accent
 * @param {string} [props.subtitle] - Optional descriptive subtitle
 * @param {React.ReactNode} [props.rightElement] - Optional element anchored on the extreme right (e.g. Social Links)
 * @param {string} [props.className] - Additional classes
 */
const SectionTitle = ({ title, highlight, subtitle, rightElement, className = '' }) => {
  return (
    <div className={`section-header-block animate-fade-up ${className}`.trim()}>
      <div className="section-title-row">
        <span className="section-title-lead" aria-hidden="true">
          <span className="lead-dot" />
          <span className="lead-line" />
        </span>
        <h2 className="section-title">
          {highlight && <span className="highlight-text">{highlight}</span>}
          {highlight ? ` ${title}` : title}
        </h2>
        <span className="section-title-track" aria-hidden="true">
          <span className="track-line" />
          <span className="track-node" />
        </span>
        {rightElement && (
          <div className="section-title-right">
            {rightElement}
          </div>
        )}
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
