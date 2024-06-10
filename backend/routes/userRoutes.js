const express = require('express');
const router = express.Router();
const { register,updateUser, getAllUsers } = require('../controllers/userController')
const {authenticateUser, authorizeDepartment}=require('../middlewares/authMiddleware')
// login import
const { login } = require('../controllers/userController');


const { emailVerify } = require('../controllers/userController')


router.get('/verifyEmail/:token',emailVerify);

router.put('/:empId',authenticateUser, updateUser);

// login
router.post('/login', login);

router.route('/').post(register).get(authenticateUser,authorizeDepartment('HR'),getAllUsers);




module.exports = router;