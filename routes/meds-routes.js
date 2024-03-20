const express = require('express');
const router = express.Router();
const medsController = require('../controllers/meds-controllers');

router
    .post("/add", medsController.addMedication)
    .post("/:id/update", medsController.updateMedication)

// - POST /meds/add - Endpoint to create a new medication
// - POST /meds/:id/update - Endpoint to update/edit med dose, frequency, or times taken

module.exports = router;