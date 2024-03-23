const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');

router
    .post("/add/:userId", medsController.addMedication)
    .post("/:userId/update", medsController.updateMedication)

module.exports = router;