const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile('/public/index.html'));

// POST Route for a new note
app.post('/api/tips', (req, res) => {
    console.info(`${req.method} request received to add a tip`);

    const { title, tip } = req.body;

    if (req.body) {
        const newNote = {
            title,
            tip
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note')
    }

});