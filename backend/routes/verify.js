const cors = require("cors");
const express = require('express');
const { registerUser, loginUser, googleSignIn } = require('../Controller/setup');
const router = express.Router();


const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,             
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'] 
};

router.use(cors(corsOptions));


router.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "same-origin");
    next();
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleSignIn);

module.exports = router;
