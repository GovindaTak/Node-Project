const express = require('express');
const multer = require('multer');
const { uploadMultiple } = require('../controllers/chatController');


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

router.post('/upload-multiple', upload.array('pdfs', 3), uploadMultiple);


module.exports = router;