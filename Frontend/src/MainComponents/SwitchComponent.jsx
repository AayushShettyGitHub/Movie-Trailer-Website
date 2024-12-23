import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 
import Movie from './Movie'; 
import MovieDetail from './MovieDetail'; 

const SwitchComponent = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchState, setSearchState] = useState(false);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setSearchState(keyword !== '');
  };

  const handlePosterClick = (movie) => {
    setActiveMovie(movie);
    setSearchState(false);
  };

  const closeMovieDetail = () => {
    setActiveMovie(null);
  };

  return (
    <div className="bg-black text-white min-h-screen relative">
      {isAuthenticated && <NavBar onSearch={handleSearch} />} {/* Render NavBar only if authenticated */}
      {activeMovie ? (
        <MovieDetail movie={activeMovie} onClose={closeMovieDetail} />
      ) : (
        <div className="pt-16">
          {searchState ? (
            <Movie keyword={searchKeyword} onPosterClick={handlePosterClick} />
          ) : (
            <div>
              <Movie keyword="Batman" onPosterClick={handlePosterClick} />
              <Movie keyword="Avengers" onPosterClick={handlePosterClick} />
              <Movie keyword="DeadPool" onPosterClick={handlePosterClick} />
              <Movie keyword="Wolverine" onPosterClick={handlePosterClick} />
              <Movie keyword="Dragon Ball Z" onPosterClick={handlePosterClick} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SwitchComponent;
