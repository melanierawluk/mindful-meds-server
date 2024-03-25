const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router
    .get('/:userId', userController.getUserProfile)

module.exports = router;