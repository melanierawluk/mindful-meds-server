const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controllers');

router
    .get('/:userId/:date', notesController.getNotesByDate)
    .patch('/:userId', notesController.editNote)
    .post('/:userId', notesController.createNote)

module.exports = router;