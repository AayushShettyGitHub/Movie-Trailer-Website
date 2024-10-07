import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import useFetchMovies from './useFetchMovies'; // Adjust the path as necessary

const Movie = ({ keyword }) => {
  const { movies, loading, error } = useFetchMovies(keyword); // Fetch movies based on keyword
  const [trailers, setTrailers] = useState({});
  const [activeMovieId, setActiveMovieId] = useState(null);

  const fetchTrailer = async (movieId, title) => {
    if (trailers[movieId]) {
      setActiveMovieId(movieId);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5003/api/getTrailer?title=${title}`);
      const trailerUrl = response.data.trailerUrl || 'Trailer not available';
      setTrailers((prev) => ({ ...prev, [movieId]: trailerUrl }));
      setActiveMovieId(movieId);
    } catch (error) {
      console.error("Failed to fetch trailer", error);
      setTrailers((prev) => ({ ...prev, [movieId]: 'Trailer not available' }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (movies.length === 0) return <p>No movie data available</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">{keyword} Movie List</h1>
      {movies.map((movie) => (
        <div key={movie.imdbID} className="flex flex-col items-center p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {movie.title} ({movie.year})
          </h2>
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="w-72 h-auto rounded-lg shadow-lg" />
          ) : (
            <p>No poster available</p>
          )}
          <button
            className="text-blue-600 underline mt-2"
            onClick={() => fetchTrailer(movie.imdbID, movie.title)}
          >
            Watch Trailer
          </button>
          {activeMovieId === movie.imdbID && trailers[movie.imdbID] && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Trailer:</h3>
              {trailers[movie.imdbID] !== 'Trailer not available' ? (
                <>
                  <ReactPlayer url={trailers[movie.imdbID]} controls />
                  <button
                    className="text-red-600 underline mt-2"
                    onClick={() => setActiveMovieId(null)} // Close trailer on button click
                  >
                    Close Trailer
                  </button>
                </>
              ) : (
                <p>Trailer not available</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movie;
