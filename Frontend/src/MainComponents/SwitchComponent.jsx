import React, { useState } from 'react';
import Movie from './Movie';
import NavBar from './NavBar'; // Adjust the path as necessary

const SwitchComponent = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchState, setSearchState] = useState(false);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setSearchState(true); // Set to true to display search results
  };

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      {searchState ? (
        <Movie keyword={searchKeyword} />
      ) : (
        <div>
          <Movie keyword="Batman" />
          <Movie keyword="Avengers" />
          <Movie keyword="DeadPool" />
          <Movie keyword="Wolverine" />
          <Movie keyword="Dragon Ball Z" />
        </div>
      )}
    </div>
  );
};

export default SwitchComponent;
