// models/Chat.js

const mongoose = require('mongoose');
const querySchema = require('./Query');

const chatSchema = new mongoose.Schema({
    empId: { type: String, required: true },
    email: { type: String, required: true },
    Files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Files' }],
    queries: [querySchema],
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
