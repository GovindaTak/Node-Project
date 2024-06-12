const { uploadFilesToPythonAPI, uploadPdfsService } = require('../services/chatService');
const asyncHandler = require('../api/asyncHandler');
const { ApiResponse } = require('../api/ApiResponse');
const { ApiError } = require('../api/ApiError')
const axios = require('axios');


const uploadMultiple = asyncHandler(async (req, res) => {
  try {

    const user = req.userInfo;
    const newChat = await uploadPdfsService(user.empId, user.email, req.files);

    if(newChat){
     const chatId = newChat._id;

      const response = await uploadFilesToPythonAPI(req.files);
      const data = {
        response,
        chatId
      }
      const apiResponse = new ApiResponse(200, data, "Files uploaded successfully");
      return res.status(apiResponse.statusCode).json(apiResponse);

    }
    return res.status(500).send("Error occurred during upload.");

   
  } catch (error) {
    console.error("Upload error:", error);
    res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
  }
});



// const uploadMultiple = asyncHandler(async (req, res) => {
//   try {
//     console.log("hiii")
//     const response = await uploadFilesToPythonAPI(req.files);
//     const apiResponse = new ApiResponse(200, response, "Files uploaded successfully");
//     res.status(apiResponse.statusCode).json(apiResponse);
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
//   }
// });









module.exports = {
  uploadMultiple,
  
};
