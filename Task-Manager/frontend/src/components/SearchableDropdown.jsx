import { useState, useRef, useEffect } from 'react';
import './SearchableDropdown.css';

export default function SearchableDropdown({ options, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="searchable-dropdown" ref={dropdownRef}>
      <div 
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className="material-icons dropdown-icon">
          {isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
        </span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-container">
            <span className="material-icons search-icon">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="dropdown-options">
            {filteredOptions.map(option => (
              <div
                key={option.value}
                className={`dropdown-option ${
                  selectedOption?.value === option.value ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedOption(option);
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="dropdown-empty">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}