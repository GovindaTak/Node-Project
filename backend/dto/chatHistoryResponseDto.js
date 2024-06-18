class ChatHistoryResponseDto {
  constructor(chat) {
      this.chatHistory = [{
          chatId: chat.chatId,
          chatName: chat.chatName,
          date: chat.date,
          time: chat.time
      }];
  }

  // Method to add new chat to the chatHistory
  addChat(chat) {
      this.chatHistory.push({
          chatId: chat.chatId,
          chatName: chat.chatName,
          date: chat.date,
          time: chat.time
      });
  }
}

module.exports = ChatHistoryResponseDto;
