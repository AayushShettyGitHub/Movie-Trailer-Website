import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";
import axios from "axios";

const SignIn = ({ switchMode, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const res = await axios.post("http://localhost:8082/api/verify/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true); 
      navigate("/main"); 
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded-lg text-center">
              {errorMessage}
            </div>
          )}
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
            Sign In
          </button>
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
        <div className="mt-6">
          <GoogleSignIn setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
