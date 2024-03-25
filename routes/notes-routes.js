const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controllers');

router
    .get('/:userId/:date', notesController.getNotesByDate)
    .patch('/:userId/:noteId', notesController.editNote)
    .post('/:userId', notesController.createNote); // Add route for creating new notes

module.exports = router;