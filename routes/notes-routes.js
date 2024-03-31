const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controllers');
const verifyToken = require('../middleware/verifyToken');


router
    .get('/:userId/:date', verifyToken, notesController.getNotesByDate)
    .patch('/:userId', verifyToken, notesController.editNote)
    .post('/:userId', verifyToken, notesController.createNote)

module.exports = router;