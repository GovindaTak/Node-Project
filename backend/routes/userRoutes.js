const express = require('express');
const router = express.Router();
const { register,updateUser } = require('../controllers/userController')
const {authenticateUser}=require('../middlewares/authMiddleware')
// login import
const { login } = require('../controllers/userController');

router.put('/:empId',authenticateUser, updateUser);
router.post('/', register);

// login
router.post('/login', login);

module.exports = router;