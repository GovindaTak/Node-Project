const express = require('express');
const multer = require('multer');



const { upload } = require('../middlewares/multerMiddleware')



const { uploadMultiple,handleQuery, queryHistoryHandler,deleteChat , deleteQueryFromChat} = require('../controllers/chatController');


const {authenticateUser,authorizeDepartment}=require('../middlewares/authMiddleware')


const router = express.Router();


router.post('/upload-multiple', authenticateUser, upload.array('pdfs', 3), uploadMultiple);


router.post('/query_handler',authenticateUser, handleQuery);


router.delete('/delete-chat/:chatId', authenticateUser, deleteChat);


router.get(`/chat_history/:chatId`,authenticateUser, queryHistoryHandler);

router.delete('/chats/:chatId/queries/:queryId', authenticateUser, deleteQueryFromChat);


module.exports = router;