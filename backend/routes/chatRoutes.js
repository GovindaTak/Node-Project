const express = require('express');
const multer = require('multer');
const { uploadMultiple } = require('../controllers/chatController');
const {authenticateUser}=require('../middlewares/authMiddleware')
const { upload } = require('../middlewares/multerMiddleware')


const router = express.Router();


router.post('/upload-multiple', authenticateUser, upload.array('pdfs', 3), uploadMultiple);




module.exports = router;