
const cloudinary = require('../config/cloudinary');
const Chat = require('../models/Chat');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { ApiError } = require('../api/ApiError');
const queryRequestDto = require('../dto/queryRequestDto');
const { Query } = require('mongoose');

const handleQueryService = async (empId, role, chatId, queryText) => {

      const requestQuery= queryRequestDto(chatId,queryText);
      queryRequestDto.validate(requestQuery,empId,role);

try {
    const response = await axios.post(`${process.env.PYTHON_API}/invoke`, { "input": {
        "input": query.queryText
      }});

      const queryResponse=queryRequestDto(requestQuery.chatId,requestQuery.queryText,response.data.output.output);
      const newQuery=Query(queryResponse.queryText,queryResponse.responseText);
      const chat = await Chat.findById(requestQuery.chatId);
      chat.queries.push(newQuery);
    await chat.save();
   // return response.data;
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
    const response = await axios.post('http://55.55.54.128:5002/api/v1/upload-files', form, {  
      headers: {
        ...form.getHeaders()
      }
    });
    return response.data;

  } catch (error) {
    // throw new ApiError(500, error.response?.data?.message || 'Internal Server Error!!!!');
    if (error instanceof ApiError) {
      throw error;
    }
    console.log("**************",error)
    throw new ApiError(500, error.response?.data?.message || 'Internal Server Error!!!!');
  }
    
  
};



module.exports = {
  uploadFilesToPythonAPI,
  handleQueryService
};

