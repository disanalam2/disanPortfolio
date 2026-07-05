import React from 'react';

const TextAreaField = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  rows = 4, 
  required = false, 
  ...rest 
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      rows={rows}
      required={required}
      aria-label={placeholder || name}
      {...rest}
    />
  );
};

export default TextAreaField;