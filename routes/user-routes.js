const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router
    .get('/:userId', userController.getUserProfile)
    .get('/:userId/meds', userController.getUserMedicationList)
    .get('/:userId/meds/:medId', userController.getUserMedication)
    .get('/:userId//notes/:date', userController.getNotes)

// - GET /user/:id/notes/:date - Retrieve notes for a specified date. Includes information about medication that were active on the specified date

module.exports = router;