const express = require('express');
const multer = require('multer');
const { upload } = require('../middlewares/multerMiddleware')
const { uploadMultiple,handleQuery, saveChatTitle, getChatTitles  } = require('../controllers/chatController');
const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')
const router = express.Router();


router.post('/upload-multiple', authenticateUser, upload.array('pdfs', 3), uploadMultiple);
router.post('/query_handler',authenticateUser, handleQuery);
router.get('/chat_titles', authenticateUser, getChatTitles);

module.exports = router;