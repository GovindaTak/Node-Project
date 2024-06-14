const express = require('express');
const multer = require('multer');



const { upload } = require('../middlewares/multerMiddleware')


const { uploadMultiple,handleQuery, queryHistoryHandler } = require('../controllers/chatController');
const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')


const router = express.Router();


router.post('/upload-multiple', authenticateUser, upload.array('pdfs', 3), uploadMultiple);


router.post('/query_handler',authenticateUser, handleQuery);
router.get(`/chat_history/:chatId`,authenticateUser, queryHistoryHandler);

module.exports = router;