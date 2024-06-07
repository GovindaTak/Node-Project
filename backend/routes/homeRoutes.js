// userRouter.js

const express = require('express');
const router = express.Router();
const { forgetPassword } = require('../controllers/homeController');

// Forget Password API
router.get('/forgetPassword', forgetPassword);

module.exports = router;
