const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');
const verifyToken = require('../middleware/verifyToken');

router
    .get('/:userId', verifyToken, medsController.getMedicationList)
    .get('/:userId/:medId', verifyToken, medsController.getMedicationById)
    .get('/:userId/date/:date', verifyToken, medsController.getMedicationsByDate)
    .post("/:userId/add", verifyToken, medsController.addMedication)
    .post("/:medId/update", verifyToken, medsController.updateMedication)
    .patch("/:userId/:medId", verifyToken, medsController.stopMedication)

module.exports = router;