const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');

router
    .get('/:userId', medsController.getMedicationList)
    .get('/:userId/:medId', medsController.getMedication)
    .post("/:userId/add", medsController.addMedication)
    .post("/:userId/update", medsController.updateMedication)

module.exports = router;