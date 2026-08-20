import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import './SearchInput.css';

const SearchInput = ({ placeholder = "Search..." }) => {
  const { searchQuery, setSearchQuery, isSearchActive, setIsSearchActive } = useSearch();
  const [localValue, setLocalValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Sync local state with context
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setSearchQuery(value);
    setIsSearchActive(value.trim().length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localValue.trim()) {
      setSearchQuery(localValue);
      setIsSearchActive(true);
    }
  };

  const handleClear = () => {
    setLocalValue('');
    setSearchQuery('');
    setIsSearchActive(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          name="text"
          className="input"
          placeholder={placeholder}
          value={localValue}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* Search Icon - Always visible */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="icon search-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7.5" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        
        {/* Clear (Cross) Icon - Proper X icon */}
        {(localValue || isFocused) && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="clear-icon"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
