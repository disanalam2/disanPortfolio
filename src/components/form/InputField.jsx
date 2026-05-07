import React from 'react';

const InputField = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  required = false, 
  ...rest 
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
      {...rest}
    />
  );
};

export default InputField;