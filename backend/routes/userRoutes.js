const express = require('express');
const router = express.Router();

const { register,updateUser, getAllUsers } = require('../controllers/userController')

const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')

// login import

const {  getUserById, deleteUserController } = require('../controllers/userController');



const { emailVerify } = require('../controllers/userController')


router.get('/verifyEmail/:token',emailVerify);

router.put('/:empId',authenticateUser, updateUser);
router.delete('/:empId',authenticateUser, authorizeDepartment('admin'),deleteUserController);//only admin can delete the user 


router.get('/user/:empId',authenticateUser, getUserById);

router.route('/').post(register).get(authenticateUser,authorizeDepartment('admin'),getAllUsers);




module.exports = router;