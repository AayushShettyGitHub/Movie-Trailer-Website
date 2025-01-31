import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ onSearch }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || localStorage.getItem('id_token'));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearchPrompt, setShowSearchPrompt] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBackToHome = () => {
    setSearchPerformed(false);
    setSearchQuery('');
    onSearch('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    navigate('/Auth');
  };

  const decodeToken = (token) => {
    try {
      let tokenType = token.startsWith('id_token') ? 'id_token' : 'token';
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const currentTime = Date.now() / 1000;
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
    const storedToken = localStorage.getItem('token') || localStorage.getItem('id_token');
    setToken(storedToken);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSearchPrompt(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchPrompt(true);
    } else {
      onSearch(searchQuery);
      setSearchQuery('');
      setSearchPerformed(true);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-800'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {searchPerformed && (
              <button
                onClick={handleBackToHome}
                className="text-white font-bold text-lg cursor-pointer flex items-center justify-center 
                           bg-red-600 hover:bg-red-700 text-2xl p-2 rounded-full transition-transform duration-300 
                           transform hover:scale-110"
                style={{ color: 'white' }}
              >
                &lt;-
              </button>
            )}
            <h1
              className="text-white font-bold text-xl cursor-pointer ml-2"
              onClick={handleBackToHome}
            >
              MovieApp
            </h1>

            <button
              className="text-white ml-auto md:hidden focus:outline-none"
              onClick={toggleSidebar}
            >
              ☰
            </button>
          </div>

          <ul className="hidden md:flex space-x-8 text-white justify-center">
            {['Hero', 'Explore', 'About', 'Contact Us'].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="border p-2 rounded bg-gray-800 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="text-white bg-red-500 px-4 py-2 rounded ml-2 hover:bg-red-700 transition-all duration-300"
              >
                Search
              </button>
              {showSearchPrompt && (
                <p className="text-red-500 text-sm ml-4">
                  Please enter a movie name
                </p>
              )}
            </form>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        
        <div
          className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                      transition-transform duration-300 ease-in-out bg-gray-900 text-white w-64 p-4 md:hidden z-50`}
        >
          <button
            className="text-white text-2xl ml-auto mb-4 focus:outline-none"
            onClick={toggleSidebar}
          >
            ✕
          </button>
          <ul className="space-y-6">
            {['Home', 'Explore', 'About', 'Contact Us'].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                onClick={() => setIsSidebarOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
