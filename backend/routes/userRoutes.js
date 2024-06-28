const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')

const { register,updateUser, getAllUsers } = require('../controllers/userController')

const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')

// login import

const {  getUserById, deleteUserController } = require('../controllers/userController');



const { emailVerify } = require('../controllers/userController')


router.get('/verify/:token',emailVerify);

router.put('/:Id',authenticateUser, upload.single('image'),updateUser);
router.delete('/:Id',authenticateUser, authorizeDepartment('admin'),deleteUserController);//only admin can delete the user 


router.get('/user/:Id',authenticateUser, getUserById);

// router.route('/').post(register).get(authenticateUser,authorizeDepartment('admin'),getAllUsers);
// router.post('/register', upload.single('image'), register);
router.route('/').post(upload.single('image'), register).get(authenticateUser, authorizeDepartment('admin'), getAllUsers);
// router.post('/register', upload.single('image'), register);


module.exports = router;