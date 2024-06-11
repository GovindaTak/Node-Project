// userRouter.js

const express = require('express');
const router = express.Router();
const { forgetPassword, login } = require('../controllers/homeController');

// Forget Password API
router.get('/forgetPassword', forgetPassword);
router.post('/login', login);


module.exports = router;
