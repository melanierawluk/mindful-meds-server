const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router
    .get('/:userId', userController.getUserProfile)
    .get('/:userId/meds', userController.getUserMedicationList)
    .get('/:userId/meds/:medId', userController.getUserMedication)
    .get('/:userId/notes/:date', userController.getNotes)
    .patch('/:userId/notes/:noteId', userController.editNote)

module.exports = router;