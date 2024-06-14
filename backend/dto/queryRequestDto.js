const Validator = require('../utils/validator');
const {ApiError} = require('../api/ApiError');
const Chat = require('../models/Chat');
class queryRequestDto {
    constructor(chatId,queryText) {
      this.chatId=chatId,
      this.queryText=queryText
    }

    static async validate(queryData,empId,role){
        const { chatId } = queryData;
    

     const chat =  await Chat.findById(chatId);
     if (!chat) {
        throw new ApiError(404, 'Chat not found');
    }
    if(chat.empId!=empId)
        {
            if(role=='admin')return;
            throw new ApiError(401,'you UnAuthorized to get details of another user !!');
        }
    }
}

module.exports = queryRequestDto;