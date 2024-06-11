const express = require('express');
const router = express.Router();
const { register,updateUser, getAllUsers } = require('../controllers/userController')
const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')
// login import
const { login , deleteUserController } = require('../controllers/userController');


const { emailVerify } = require('../controllers/userController')

//--------------------------------

router.put('/:empId',authenticateUser,authorizeDepartment('admin'), updateUser);



module.exports = router;