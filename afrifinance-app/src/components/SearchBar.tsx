import React from "react";
import { useSearch } from "./SearchContext";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const { isOpen, query, setQuery, closeSearch } = useSearch();

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search markets, stocks, or news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button onClick={closeSearch}>✖</button>
      </div>
    </div>
  );
};

export default SearchBar;
