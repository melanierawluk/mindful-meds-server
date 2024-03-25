const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controllers');

router
    .get('/:userId/:date', notesController.getNotes)
    .patch('/:userId/:noteId', notesController.editNote)

module.exports = router;