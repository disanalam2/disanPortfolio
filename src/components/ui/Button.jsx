import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'danger' | 'ghost'} [props.variant='primary'] - Button style variant
 * @param {string} [props.className] - Additional classes
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.asLink] - If true, renders as an <a> tag
 * @param {string} [props.href] - Href if asLink is true
 * @param {string} [props.to] - react-router-dom path
 */
const Button = ({ children, variant = 'primary', className = '', onClick, disabled, asLink, href, to, ...rest }) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'primary-btn' 
                     : variant === 'secondary' ? 'secondary-btn'
                     : variant === 'danger' ? 'cancel-btn'
                     : variant === 'ghost' ? 'ghost-btn' : '';
  
  const combinedClasses = `${baseClass} ${variantClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  if (asLink) {
    return (
      <a href={href} className={combinedClasses} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
