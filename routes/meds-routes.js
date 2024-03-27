const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');

router
    .get('/:userId', medsController.getMedicationList)
    .get('/:userId/:medId', medsController.getMedicationById)
    .get('/:userId/date/:date', medsController.getMedicationsByDate)
    .post("/:userId/add", medsController.addMedication)
    .post("/:medId/update/", medsController.updateMedication)
    .patch("/:userId/:medId", medsController.stopMedication)

module.exports = router;