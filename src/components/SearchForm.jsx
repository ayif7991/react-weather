// Review Comment - This file is empty but should be created to hold the search form component
// Extract the search form from App.jsx into this component:
/**
 * Example implementation:
 * 
 * import { useState } from 'react';
 * 
 * function SearchForm({ onSearch, defaultCity = '' }) {
 *   const [searchInput, setSearchInput] = useState(defaultCity);
 * 
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     if (searchInput.trim() === '') return;
 *     onSearch(searchInput);
 *   };
 * 
 *   return (
 *     <form onSubmit={handleSubmit} className="search-form">
 *       <input
 *         type="text"
 *         value={searchInput}
 *         onChange={(e) => setSearchInput(e.target.value)}
 *         placeholder="Enter city"
 *         className="search-input"
 *       />
 *       <button type="submit" className="search-btn">
 *         Search
 *       </button>
 *     </form>
 *   );
 * }
 * 
 * export default SearchForm;
 */
