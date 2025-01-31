import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const MovieDetail = ({ movie, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieDetails, setMovieDetails] = useState({
    description: "",
    rating: "",
    cast: "",
    director: "",
    genre: "",
  });


  const fetchTrailer = async (title) => {
    try {
      const response = await axios.get(`http://localhost:5003/api/getTrailer?title=${title}`);
      const fetchedTrailerUrl = response.data.trailerUrl || "Trailer not available";
      setTrailerUrl(fetchedTrailerUrl);
    } catch (error) {
      console.error("Failed to fetch trailer", error);
      setTrailerUrl("Trailer not available");
    }
  };


  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`http://localhost:5003/api/movieDescription?imdbID=${imdbID}`);
      const details = response.data;
      setMovieDetails({
        description: details.description || "No description available.",
        rating: details.rating || "N/A",
        cast: details.cast || "N/A",
        director: details.director || "N/A",
        genre: details.genre || "N/A",
      });
    } catch (error) {
      console.error("Failed to fetch movie details", error);
      setMovieDetails({
        description: "No description available.",
        rating: "N/A",
        cast: "N/A",
        director: "N/A",
        genre: "N/A",
      });
    }
  };

  useEffect(() => {
    fetchTrailer(movie.title);
    fetchMovieDetails(movie.imdbID);
  }, [movie]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
      <div className="relative w-full h-full flex flex-col bg-gradient-to-r from-gray-900 to-black text-white p-10">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition duration-300"
        >
          X
        </button>

       
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
       
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full lg:w-72 h-auto rounded-lg shadow-lg transition-transform duration-500 hover:scale-110"
          />

          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title} ({movie.year})</h1>
            <p className="text-lg text-gray-400 mb-2 italic">{movieDetails.genre}</p>
            <p className="text-base text-gray-300 mb-4">{movieDetails.description}</p>

          
            {trailerUrl !== "Trailer not available" ? (
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
                <ReactPlayer
                  url={trailerUrl}
                  controls
                  className="w-full h-auto"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            ) : (
              <p className="text-gray-400 mt-4">Trailer not available</p>
            )}
          </div>
        </div>

     
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-center w-full">Cast:</h3>
          {movieDetails.cast ? (
            movieDetails.cast.split(",").map((actor, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gray-500 rounded-full mb-2"></div>
                <span className="text-gray-300 text-lg">{actor.trim()}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No cast details available.</p>
          )}
        </div>

       
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-gray-500 rounded-full mb-2"></div> 
            <p className="text-lg text-gray-300">{movieDetails.director}</p>
          </div>
        </div>

       
        <div className="mt-10 overflow-y-auto max-h-96 px-4">
          <p className="text-lg text-gray-300">{movieDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
