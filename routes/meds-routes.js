const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');

router
    .post("/add", medsController.addMedication)
    .post("/:id/update", medsController.updateMedication)

module.exports = router;