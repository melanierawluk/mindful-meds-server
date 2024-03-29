const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controllers');


router
    .post('/login', authController.authUser)
    .post('/register', authController.registerUser)

module.exports = router;