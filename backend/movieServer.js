
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const server = express();

server.use(cors());
server.use(express.json());


server.get('/', (req, res) => res.send('Server2 is running'));
server.use('/api', require('./routes/movieRoutes')); // Check the path to your routes file


const port = 5003;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Move the API call inside an async function

