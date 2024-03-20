const router = require('express');
const userController = require('../controllers/user-controllers');

// - GET /user/:id - Endpoint to get a user profile
// - GET /user/:id/meds - Endpoint to retrieve a list of all meds for user
// - GET /user/:id/meds/:id - Endpoint to retireve medication details for specific medication
// - GET /user/:id/notes/:date - Retrieve notes for a specified date. Includes information about medication that were active on the specified date

module.exports = router;