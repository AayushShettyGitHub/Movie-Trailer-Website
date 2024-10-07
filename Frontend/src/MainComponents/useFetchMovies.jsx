import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMovies = (keyword) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/moviePopular?keyword=${keyword}`);
        const { movies } = response.data;
        setMovies(movies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [keyword]);

  return { movies, loading, error };
};

export default useFetchMovies;
