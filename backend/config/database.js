const mongoose = require('mongoose');
require('dotenv').config(); 

const url = process.env.connect_string;  


const databaseConnect = mongoose.connect(url);

databaseConnect
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = databaseConnect;
