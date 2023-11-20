// Loads environment variables from .env file with credentials
require('dotenv').config();
const express = require('express');

// Imports the mongoose module to interact with the MongoDB database
const mongoose = require('mongoose');

// Imports the method-override module to support PUT and DELETE from forms where the client doesn't support it
const methodOverride = require('method-override');

// Initializes the Express application
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connects to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully.');

  // Start the server only after the database connection is established
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exits the process if MongoDB connection fails
});

// Import the survey routes
const surveyRoutes = require('./routes/surveyroutes');

// Use survey routes
app.use('/surveys', surveyRoutes);

// Define a route for the home page
app.get('/', (req, res) => {
  res.render('home'); // Renders the home.ejs as the landing page
});


