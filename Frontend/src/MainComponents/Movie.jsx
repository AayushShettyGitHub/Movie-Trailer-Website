import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useFetchMovies from './useFetchMovies'; // Adjust the path as necessary
import MovieDetail from './MovieDetail'; // Adjust the path as necessary

const Movie = ({ keyword, onPosterClick }) => {
  const { movies, loading, error } = useFetchMovies(keyword);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    onPosterClick(movie); // Call the onPosterClick prop to handle state in SwitchComponent
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;
  if (movies.length === 0) return <p className="text-center text-gray-400">No movie data available</p>;

  return (
    <div className="pt-20 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500">{keyword} Movies</h1>
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} onClose={handleClose} />
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.imdbID} className="flex justify-center">
              <div className="bg-gray-800 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={movie.poster || '/placeholder.png'}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handlePosterClick(movie)} // Open MovieDetail on poster click
                />
                <h2 className="mt-4 text-lg font-semibold text-center">{movie.title} ({movie.year})</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Movie;
