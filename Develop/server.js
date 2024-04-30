// Import necessary modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
let db = require('./db/db.json'); // Importing the database

const { v4: uuidv4 } = require('uuid'); // Generate unique IDs

// Middleware setup
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// API Routes

// GET /api/notes - Return all saved notes
app.get('/api/notes', (req, res) => {
    // Read the database file and send its contents as a response
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        const dbData = JSON.parse(data); // Parse JSON data
        res.json(dbData); // Send as JSON response
    });
});

// POST /api/notes - Add a new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body; // Extract new note from request body
    newNote.id = uuidv4(); // Assign a unique ID
    db.push(newNote); // Add to in-memory database array
    // Write the updated array to the database file
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(newNote); // Respond with the new note object
    });
});

// DELETE /api/notes/:id - Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const noteIdToDelete = req.params.id; // Extract ID of note to delete
    db = db.filter((note) => note.id !== noteIdToDelete); // Remove note from in-memory database
    // Update the database file
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Note deleted successfully'); // Respond with success message
    });
});

// HTML Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send index.html
});

// Notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html')); // Send notes.html
});

// Wildcard route for any other paths
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Redirect to index.html
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); // Log server start message
});
