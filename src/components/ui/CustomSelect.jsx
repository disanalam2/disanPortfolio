import React, { useState, useRef, useEffect, useId } from 'react';
import './CustomSelect.scss';

const CustomSelect = ({ 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select an option', 
  ariaLabel = 'Select option',
  className = '',
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectId = useId();

  // Close when clicking outside or pressing Escape, or when another CustomSelect opens
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOtherSelectOpen = (event) => {
      if (event.detail !== selectId) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('custom-select-open', handleOtherSelectOpen);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('custom-select-open', handleOtherSelectOpen);
    };
  }, [selectId]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    if (nextState) {
      window.dispatchEvent(new CustomEvent('custom-select-open', { detail: selectId }));
    }
    setIsOpen(nextState);
  };

  const selectedOption = options.find((opt) => 
    typeof opt === 'object' ? opt.value === value : opt === value
  );

  const selectedLabel = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : placeholder;

  const handleSelect = (optionValue) => {
    setIsOpen(false);
    if (onChange) {
      onChange({
        target: {
          name,
          value: optionValue
        }
      });
    }
  };

  return (
    <div className={`custom-select-container ${className}`.trim()} ref={containerRef}>
      {/* Hidden standard select/input for form serialization and required validation */}
      <input 
        type="hidden" 
        name={name} 
        value={value || ''} 
        required={required} 
      />

      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span className="selected-text">{selectedLabel}</span>
        <svg 
          className={`select-arrow ${isOpen ? 'arrow-rotated' : ''}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-select-menu" role="listbox" tabIndex={-1}>
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = optVal === value;

            return (
              <li
                key={optVal}
                className={`custom-select-option ${isSelected ? 'is-selected' : ''}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(optVal)}
              >
                <span>{optLabel}</span>
                <span className="option-checkmark" aria-hidden="true">✓</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
