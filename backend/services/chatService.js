const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { ApiError } = require('../api/ApiError');

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
  uploadFilesToPythonAPI
};
