import React from 'react';


const SearchForm = ({ searchInput, setSearchInput, handleSearch }) => {
    return (
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter city"
                className="search-input"
            />
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
};

export default SearchForm;