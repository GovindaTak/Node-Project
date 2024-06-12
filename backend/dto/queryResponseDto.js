class queryResponseDto {
    constructor(chatId,queryText,responseText,chatName) {
      this.chatId=chatId,
      this.queryText=queryText,
      this.responseText=responseText;
      this.chatName=chatName;
    }
   }
module.exports = queryResponseDto;