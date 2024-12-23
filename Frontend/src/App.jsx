import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Toggle from './components/Toggle';
import SwitchComponent from './MainComponents/SwitchComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Update authentication state based on token presence
    console.log("IsAuthenticated:", isAuthenticated);
    console.log("AuthToken:", localStorage.getItem('authToken'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/main" : "/auth"} />} 
        />
        <Route 
          path="/auth" 
          element={<Toggle setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/main" 
          element={isAuthenticated ? <SwitchComponent isAuthenticated={isAuthenticated} /> : <Navigate to="/auth" />} 
        />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
