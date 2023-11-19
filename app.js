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
mongoose.connect(process.env.DB_URI)
.then(() => {
  console.log('MongoDB connected successfully.');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exits the process if MongoDB connection fails
});

// Imports the model
const Assignment = require('./models/Assignment');

// Define a route for the home page
app.get('/', (req, res) => {
  res.render('home'); // This will render the home.ejs file
});

// Route to display all assignments
app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.render('assignments', { assignments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving assignments from database');
  }
});
// Route to display the form for a new assignment
app.get('/assignments/new', (req, res) => {
    res.render('new-assignment'); // This EJS file will contain the form
  });

// Route to handle the form submission for creating a new assignment
app.post('/assignments', async (req, res) => {
    try {
      const newAssignment = new Assignment(req.body);
      await newAssignment.save();
      res.redirect('/assignments'); // Redirects to the list of all assignments
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating a new assignment'); // Error catch
    }
  });
// Route to display the form to edit an existing assignment
app.get('/assignments/:id/edit', async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);
      res.render('edit-assignment', { assignment }); // Passes the assignment to the EJS file
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading the assignment to edit');
    }
  });
    
// Route to handle the form submission for updating an existing assignment
app.put('/assignments/:id', async (req, res) => {
    try {
      await Assignment.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/assignments');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating the assignment');
    }
  });
  
// Route to handle the deletion of an assignment
app.delete('/assignments/:id', async (req, res) => {
    try {
      await Assignment.findByIdAndDelete(req.params.id);
      res.redirect('/assignments');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting the assignment');
    }
  });
  
// PORT
const PORT = process.env.PORT || 3000;
