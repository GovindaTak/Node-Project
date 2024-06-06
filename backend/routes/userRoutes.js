const express = require('express');
const router = express.Router();

const { register } = require('../controllers/userController')
// login import
const { login } = require('../controllers/userController');


router.post('/', register);

// login
router.post('/login', login);

module.exports = router;