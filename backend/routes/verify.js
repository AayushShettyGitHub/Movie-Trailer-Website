const cors = require("cors");
const express = require('express');
const { registerUser, loginUser, googleSignIn } = require('../Controller/setup');
const router = express.Router();

// Correct CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend origin
  credentials: true,              // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  exposedHeaders: ['Authorization'] // Expose headers if needed
};

router.use(cors(corsOptions)); // Apply CORS middleware

// Set headers for Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy
router.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "same-origin");
    next();
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleSignIn);

module.exports = router;
