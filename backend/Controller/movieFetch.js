const axios = require('axios');
require('dotenv').config();

const omdbKey = process.env.movieKey; // Your OMDb API key
const youtubeKey = process.env.youtubeKey; // Your YouTube API key
exports.moviePopular = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const omdbSearchUrl = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${keyword}&type=movie`;
    const response = await axios.get(omdbSearchUrl);
    console.log(response)

    if (response.data.Response === "True" && response.data.Search.length > 0) {
      const movies = response.data.Search.slice(0, 5); // Limit to 5 movies

      const movieData = movies.map((movie) => ({
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster !== 'N/A' ? movie.Poster : null,
        imdbID: movie.imdbID
      }));

      res.json({ movies: movieData });
    } else {
      res.status(404).json({ error: 'No movies found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

exports.movieDescription = async (req, res) => {
  try {
    const { imdbID } = req.query;

    if (!imdbID) {
      return res.status(400).json({ error: 'imdbID query parameter is required' });
    }

   
    const omdbDetailUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbKey}`;
    const response = await axios.get(omdbDetailUrl);

    if (response.data.Response === "True") {
      const movieDetails = {
        title: response.data.Title,
        year: response.data.Year,
        description: response.data.Plot !== "N/A" ? response.data.Plot : "No description available.",
        rating: response.data.imdbRating !== "N/A" ? response.data.imdbRating : "No rating available.",
        cast: response.data.Actors !== "N/A" ? response.data.Actors : "Cast not available.",
        director: response.data.Director !== "N/A" ? response.data.Director : "Director not available.",
        genre: response.data.Genre !== "N/A" ? response.data.Genre : "Genre not available.",
        poster: response.data.Poster !== "N/A" ? response.data.Poster : null,
      };

      return res.json(movieDetails);
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie description' });
  }
};

exports.getTrailer = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }

    // Search for a trailer on YouTube using the movie title
    const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&q=${title} trailer&type=video&part=snippet&maxResults=1`;
    const youtubeResponse = await axios.get(youtubeSearchUrl);

    // Check if a trailer is found
    if (youtubeResponse.data.items.length > 0) {
      const trailerUrl = `https://www.youtube.com/watch?v=${youtubeResponse.data.items[0].id.videoId}`;
      return res.json({ trailerUrl });
    } else {
      return res.status(404).json({ error: 'Trailer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trailer' });
  }
};

