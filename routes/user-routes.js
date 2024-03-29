const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router
    .get('/auth', userController.getUserProfile)

module.exports = router;