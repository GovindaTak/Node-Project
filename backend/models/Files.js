// models/PdfFile.js

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    empId: { type: String, required: true },
    email: { type: String, required: true },
    files: [
        {
            filename: { type: String, required: true },
            fileUrl: { type: String, required: true },
            uploadDate: { type: Date, default: Date.now },
            uploadTime: { type: String, default: () => new Date().toLocaleTimeString(), required: true },
            fileExtension: { type: String, required: true }, // New field for file extension
            fileHash : { type: String, required : true}
        }
    ]
}, { timestamps: true }); // Add timestamps option

const Files = mongoose.model('Files', FileSchema);

module.exports = Files;
