const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const PdfFile = require('../models/PdfFile');
const Chat = require('../models/Chat');

const handleQuery = asyncHandler(async (req, res, next) => {
    const { empId, email, chatId, queryText, responseText } = req.body;
    try {
        const result = await handleQueryService(empId, email, chatId, queryText, responseText);
        res.json(new ApiResponse(true, 'Query handled successfully', result));
    } catch (error) {
        if(error instanceof ApiError)
            next(error);
        next(new ApiError(500, 'Query handling failed'));
    }
});

module.exports = {  handleQuery  };