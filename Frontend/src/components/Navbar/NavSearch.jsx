import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;