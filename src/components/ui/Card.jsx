import React from 'react';

/**
 * Reusable Card component for glassmorphism bento boxes
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional classes
 */
const Card = ({ children, className = '', ...rest }) => {
  // Common glassmorphism styles applied via CSS classes
  return (
    <div className={`card-container ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Card;
