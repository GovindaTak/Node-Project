const Validator = require('../utils/validator');
const {ApiError} = require('../api/ApiError');
const Chat = require('../models/Chat');
class queryRequestDto {
    constructor(chatId,queryText) {
      this.chatId=chatId,
      this.queryText=queryText
    }

}

module.exports = queryRequestDto;