class queryHistoryResponseDto {
    constructor(chat) {
      this.chatId=chat.chatId;
      this.chatName=chat.chatName,
      this.queries=chat.queries;
      this.date=chat.date;
      this.time=chat.time;
    }
   }
module.exports = queryHistoryResponseDto;