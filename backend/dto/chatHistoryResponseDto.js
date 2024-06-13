class chatHistoryResponseDto {
    constructor(chat) {
      this.chatId=chat.chatId;
      this.chatName=chat.chatName,
      this.date=chat.date;
      this.time=chat.time;
    }
   }
module.exports = chatHistoryResponseDto;