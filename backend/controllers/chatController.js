
const { uploadFilesToPythonAPI, uploadPdfsService,handleQueryService, retrieveQueryHistory,deleteLocalFiles, deleteChatService, deleteQueryFromChatService } = require('../services/chatService');



const asyncHandler = require('../api/asyncHandler');

const Chat = require('../models/Chat');

const { ApiResponse } = require('../api/ApiResponse');
const { ApiError } = require('../api/ApiError')
const axios = require('axios');

const handleQuery = asyncHandler(async (req, res, next) => {
    const {  chatId, queryText } = req.body;
    try {
        const result = await handleQueryService(req.userInfo.empId, req.role, chatId, queryText,req.userInfo.email);
        res.json(new ApiResponse(200,[result] ,'Query handled successfully', result));
    } catch (error) {
        if(error instanceof ApiError)
            next(error);
        next(new ApiError(500, error.message));
    }
});


// Get Chat Titles
const getChatTitles = asyncHandler(async (req, res) => {
  const user = req.userInfo;

  try {
      const chats = await Chat.find({ empId: user.empId }).select('chatName _id createdAt');

      const chatTitles = chats.map(chat => ({
          chatId: chat._id,
          chatName: chat.chatName,
          date: chat.createdAt,
          time: chat.createdAt
      }));

      const response = new ApiResponse(200, chatTitles, "Chat titles retrieved successfully");
      res.status(response.statusCode).json(response);
  } catch (error) {
      console.error('Error retrieving chat titles:', error);
      res.status(500).send('Internal Server Error');
  }
});


const uploadMultiple = asyncHandler(async (req, res) => {
  try {
    console.log("files in controller", req.files);

    const user = req.userInfo;
   

    // Call the Python API concurrently
    const pythonApiResponsePromise = uploadFilesToPythonAPI(req.files);

    const uploadFilesPromise = uploadPdfsService(user.empId, user.email, req.files);

    const [newChat, pythonApiResponse] = await Promise.all([uploadFilesPromise, pythonApiResponsePromise]);

    if (newChat) {
      const chatId = newChat._id;
      const chatName = newChat.chatName;
      const data = {
        response: pythonApiResponse,
        chatId,
       chatName
      };
      deleteLocalFiles(req.files);
      const apiResponse = new ApiResponse(200, data, "Files uploaded successfully");
      console.log("sending response to frontend")
      return res.status(apiResponse.statusCode).json(apiResponse);
    }

    return res.status(500).send("Error occurred during upload.");
  } catch (error) {
    console.error("Upload error:", error);
    res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
  }
});



const deleteChat = asyncHandler(async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const empId = req.userInfo.empId;
    const role = req.role;
    const result = await deleteChatService(chatId, empId, role);
    const apiResponse = new ApiResponse(200, {}, result.message);
    res.status(apiResponse.statusCode).json(apiResponse);
  } catch (error) {
    console.error("Delete chat error:", error);
    if(error instanceof ApiError)
      next(error)
    next(new ApiError(500,error.message));
  }
});


const queryHistoryHandler= asyncHandler(async(req,res)=>{
    const {chatId}=req.params

    const queryHistory=await retrieveQueryHistory(req.userInfo.empId,req.role,chatId);
    const response= new ApiResponse(200,[queryHistory],"chat queries successfully retrieved !!");
    return res.status(200).json(response);
});



const deleteQueryFromChat = asyncHandler(async (req, res) => {
  const { chatId, queryId } = req.params;

  const updatedChat = await deleteQueryFromChatService(chatId, queryId);

  const apiResponse = new ApiResponse(200, updatedChat, "Query deleted successfully");
  res.status(apiResponse.statusCode).json(apiResponse);
});


// const uploadMultiple = asyncHandler(async (req, res) => {
//   try {

    

//     console.log("files in controller",req.files)

//     const user = req.userInfo;
//     const newChat = await uploadPdfsService(user.empId, user.email, req.files);

//     if(newChat){
//      const chatId = newChat._id;

//       const response = await uploadFilesToPythonAPI(req.files);
//       const data = {
//         response,
//         chatId
//       }
//       const apiResponse = new ApiResponse(200, data, "Files uploaded successfully");
//       return res.status(apiResponse.statusCode).json(apiResponse);

//     }
//     return res.status(500).send("Error occurred during upload.");

   
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
//   }
// });



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
  handleQuery,

  getChatTitles , 


  deleteChat,
  

  queryHistoryHandler,
  deleteQueryFromChat

  

};

