const express = require('express');
const multer = require('multer');



const { upload } = require('../middlewares/multerMiddleware')


const { uploadMultiple,handleQuery } = require('../controllers/chatController');
const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')


const router = express.Router();


router.post('/upload-multiple', authenticateUser, upload.array('pdfs', 3), uploadMultiple);



router.post('/handleQuery',authenticateUser, handleQuery);


module.exports = router;