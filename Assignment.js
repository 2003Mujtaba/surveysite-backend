// Imports the necessary Mongoose classes
const { Schema, model } = require('mongoose');

// Defines the schema for an assignment
const assignmentSchema = new Schema({
  title: {
    type: String,     // Data type for the title field and so forth for others below
    required: true    // Makes this field required and so on for others below
  },
  description: {
    type: String,     
    required: false   
  },
  dueDate: {
    type: Date,       
    required: true    
  },
  priority: {
    type: String,    
    required: true,
    enum: ['High', 'Medium', 'Low'] // Enum restricts the value to one of these options
  }
});

// Creates model from the schema
// interacting with the collection of documents in the database.
const Assignment = model('Assignment', assignmentSchema);

// Exports the model
// imports the model in other parts of your application.
module.exports = Assignment;
