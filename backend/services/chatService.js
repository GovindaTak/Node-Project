const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const Chat = require('../models/Chat');

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { ApiError } = require('../api/ApiError');
const Query = require('../models/Query')



const Files = require('../models/Files');





const queryRequestDto = require('../dto/queryRequestDto');
const queryResponseDto = require('../dto/queryResponseDto');
const { validateChat } = require('../utils/validator');
const Validator = require('../utils/validator');
const queryHistoryResponseDto = require('../dto/queryHistoryResponseDto');


const handleQueryService = async (empId, role, chatId, queryText) => {

      const requestQuery=new queryRequestDto(chatId,queryText);
     await validateChat(chatId,empId,role);

try {
    console.log(requestQuery.queryText);
    const response = await axios.post(`${process.env.PYTHON_API}/invoke`, { "input":{"input": requestQuery.queryText}});


     
console.log(response.data.output)
    
      const chat = await Chat.findById(requestQuery.chatId);
      const queryResponse=new queryResponseDto(requestQuery.chatId,requestQuery.queryText,response.data.output.output,chat.chatName);
     
      if(chat.queries.length==0){chat.chatName=queryResponse.queryText;}
      chat.queries.push(queryResponse);
    await chat.save();
   // return response.data;
   queryResponse.chatName=chat.chatName;
   return queryResponse;
  } catch (error) {
    // throw new ApiError(500, error.response?.data?.message || 'Internal Server Error!!!!');
    if (error instanceof ApiError) {
      throw error;
    }
    console.log("**************",error)
    throw new ApiError(500, error.response?.data?.message || error.message||'Internal Server Error!!!!');
  }
};




const uploadFilesToPythonAPI = async (files) => {
  const form = new FormData();
  files.forEach((file) => {
    form.append('files', fs.createReadStream(path.join(__dirname, '../', file.path)));
  });

  try {
    const response = await axios.post(`${process.env.PYTHON_API}/upload-files`, form, {  
      headers: {
        ...form.getHeaders()
      }
    });

    //deleteLocalFiles(files);
    console.log("response from python api --->",response.data);
    return response.data;

  } catch (error) {
    // throw new ApiError(500, error.response?.data?.message || 'Internal Server Error!!!!');
    deleteLocalFiles(files);
    if (error instanceof ApiError) {
      throw error;
    }

    console.log("**************",error)
    throw new ApiError(500, error.response?.data?.message || 'Internal Server Error!!!!');
  }
    
  
};




const uploadPdfsService = async (empId, email, files) => {
  console.log("Files in Service:", files);

  if (!files || files.length === 0) {
      throw new ApiError(400, 'No files uploaded');
  }

  const uploadPromises = files.map(async file => {
      const filePath = path.join(__dirname, '../uploads', file.filename);

      // Assuming the file has already been saved to the local file system
      const cloudinaryResponse = await uploadOnCloudinary(filePath);

      if (!cloudinaryResponse) {
          throw new ApiError(500, 'Error uploading file to Cloudinary');
      }
     // deleteLocalFiles(files);
      return {
          filename: file.originalname,
          fileUrl: cloudinaryResponse.secure_url,
          uploadDate: new Date(),
          uploadTime: new Date().toLocaleTimeString(),
          fileExtension: file.mimetype.split('/')[1]
      };
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  const newFiles = new Files({
      empId,
      email,
      files: uploadedFiles
  });

  const savedFiles = await newFiles.save();

  console.log("file id ---->",savedFiles._id)
  const newChat = new Chat({
      empId,
      email,
      files: savedFiles._id,
      queries: []
  });

  await newChat.save();

  return newChat;
};


const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null;
      
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          timeout: 60000
      });
     
      console.log("File is uploaded on Cloudinary: ", response.url);
      // fs.unlinkSync(localFilePath);
      return response;
  } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      fs.unlinkSync(localFilePath); 
      return null;
  }
};

const deleteLocalFiles = async (files) => {
  files.forEach(file => {
    const filePath = path.join(__dirname, '../', file.path);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`Successfully deleted file: ${filePath}`);
      }
    });
  });
};


const retrieveQueryHistory= async (empId, role, chatId)=>{

  await Validator.validateChat(chatId,empId,role);

  const chat=await Chat.findById(chatId)

  const responseDto=new queryHistoryResponseDto(chat);

    return responseDto;

}



const deleteChatService = async (chatId, empId, role) => {
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    throw new ApiError(400, 'Invalid chat ID');
  }

  const chat = await Chat.findById(chatId).populate('files');
  console.log("chat empId-",chat.empId ,"users empId-", empId);
  const emplId = chat.empId;
 
  if (!chat) {
    throw new ApiError(404, 'Chat not found');
  }
  if(emplId != empId && role != 'admin'){
    throw new ApiError(403, 'You are unauthorized to delete');
  }

 
  const fileDeletionPromises = chat.files.map(file => {
    return file.files.map(fileDetail => {
      const publicId = fileDetail.fileUrl.split('/').pop().split('.')[0];
      return cloudinary.uploader.destroy(publicId);
    });
  }).flat();

  await Promise.all(fileDeletionPromises);

 
 await Files.deleteMany({ _id: { $in: chat.files } });

  
   await Chat.deleteOne({ _id: chatId });

  return { message: 'Chat and associated files deleted successfully' };
};




const deleteQueryFromChatService = async (chatId, queryId) => {
  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, 'Chat not found');
  }

  const queryIndex = chat.queries.findIndex(query => query._id.toString() === queryId);

  if (queryIndex === -1) {
    throw new ApiError(404, 'Query not found in chat');
  }

  chat.queries.splice(queryIndex, 1);
  await chat.save();

  return chat;
};



module.exports = {
  uploadFilesToPythonAPI,

  uploadPdfsService,

  handleQueryService,

  deleteLocalFiles,
  deleteChatService,

  retrieveQueryHistory,
  deleteQueryFromChatService


};

