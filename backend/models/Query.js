// models/Query.js

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    queryText: { type: String, required: true },
    responseText: { type: String, default: null },
    date: { type: Date, default: Date.now },
    time: { type: String, default: () => new Date().toLocaleTimeString(), required: true }
});

module.exports = querySchema;
