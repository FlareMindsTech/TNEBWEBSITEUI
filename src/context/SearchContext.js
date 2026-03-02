import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, isSearchActive, setIsSearchActive }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
