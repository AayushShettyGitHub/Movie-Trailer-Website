// Backend/routes/movieRoutes.js
const express = require('express');

const {moviePopular ,movieDescription,getTrailer} = require('../Controller/movieFetch'); // Correctly import movieGenre


const router = express.Router();


router.get('/getTrailer', getTrailer);
router.get('/moviePopular', moviePopular);
router.get('/movieDescription', movieDescription);


module.exports = router;
