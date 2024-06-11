const cloudinary = require('../config/cloudinary');
const PdfFile = require('../models/PdfFile');
const Chat = require('../models/Chat');
const ApiError = require('../utils/ApiError');


const handleQueryService = async (empId, email, chatId, queryText, responseText) => {
const chat = await Chat.findById(chatId);

if (!chat) {
    throw new ApiError(404, 'Chat not found');
}



const newQuery = {
    queryText,
    responseText,
    date: new Date(),
    time: new Date().toLocaleTimeString()
};

chat.queries.push(newQuery);
await chat.save();

return newQuery;
};

module.exports = {  handleQueryService };