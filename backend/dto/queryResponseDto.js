class queryResponseDto {
    constructor(chatId,queryText,responseText) {
      this.chatId=chatId,
      this.queryText=queryText,
      this.responseText=responseText;
    }
   }
module.exports = queryResponseDto;