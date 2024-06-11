// models/Query.js

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    empId: { type: String, required: true },
    email: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat', required: true },
    queryText: { type: String, required: true },
    responseText: { type: String, required: true,default:null },
    date: { type: Date, default: Date.now },
    time: { type: String,default: () => new Date().toLocaleTimeString(), required: true }
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
