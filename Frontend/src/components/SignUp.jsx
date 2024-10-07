import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const SignUp = ({switchMode}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8082/api/verify/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      alert("SignUp Successful")
      setName('');
      setEmail('');
      setPassword('');
      switchMode();
     
    } catch (err) {
      console.error(err.response.data);
      setName('');
      setEmail('');
      setPassword('');
      alert("Try again")
      
    }
  };

 
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 rounded-lg text-black"
      />
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
      >
        Sign Up
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <span
          onClick={switchMode}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </form>
  </div>
</div>

  );
};

export default SignUp