import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ onSearch }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Auth');
  };

  // Function to manually decode a JWT without using external libraries
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part of the JWT
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload); // Return the parsed payload
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        console.log('Decoded Token:', decodedToken);
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    } else {
      navigate('/Auth');
    }
  }, [navigate, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    onSearch(searchQuery); // Call the onSearch prop function with the search query
    setSearchQuery(''); // Clear search input
  };

  if (!token) return null;

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default NavBar;
