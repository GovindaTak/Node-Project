const express = require('express');
const router = express.Router();
const { register,updateUser } = require('../controllers/userController')
const {authenticateUser}=require('../middlewares/authMiddleware')
// login import
const { login } = require('../controllers/userController');


const { emailVerify } = require('../controllers/userController')


router.get('/verifyEmail/:token',emailVerify);

router.put('/:empId',authenticateUser, updateUser);

// login
router.post('/login', login);

router.post('/', register);




module.exports = router;