
const asyncHandler = require('../api/asyncHandler');

const Chat = require('../models/Chat');
const { uploadFilesToPythonAPI,handleQueryService } = require('../services/chatService');
const { ApiResponse } = require('../api/ApiResponse');
const { ApiError } = require('../api/ApiError')
const axios = require('axios');

const handleQuery = asyncHandler(async (req, res, next) => {
    const {  chatId, queryText } = req.body;
    try {
        const result = await handleQueryService(req.userInfo.empId, req.role, chatId, queryText,);
        res.json(new ApiResponse(200,[result] ,'Query handled successfully', result));
    } catch (error) {
        if(error instanceof ApiError)
            next(error);
        next(new ApiError(500, error.message));
    }
});






const uploadMultiple = asyncHandler(async (req, res) => {
  try {
    const response = await uploadFilesToPythonAPI(req.files);
    const apiResponse = new ApiResponse(200, response, "Files uploaded successfully");
    res.status(apiResponse.statusCode).json(apiResponse);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
  }
});




module.exports = {
  uploadMultiple,
  handleQuery
  
};

