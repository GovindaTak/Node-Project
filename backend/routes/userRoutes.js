const express = require('express');
const router = express.Router();

const { register,emailVerify } = require('../controllers/userController')



router.post('/', register);
router.get('/verifyEmail/:token',emailVerify);
module.exports = router;