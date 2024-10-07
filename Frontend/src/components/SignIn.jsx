import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({switchMode}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8082/api/verify/login', {  email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/main')
    
      setEmail('');
      setPassword('');
      alert("Login successful")
    } catch (err) {
      console.error(err.response.data);
      alert("Login failed")
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 rounded-lg text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 rounded-lg text-black"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">Sign In</button>
      
        <p className="text-center">
        Don't have an account?{" "}
        <span
          onClick={switchMode}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  </div>
</div>

  );
};

export default SignIn