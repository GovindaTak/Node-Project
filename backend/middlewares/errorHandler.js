const { ApiError } = require('../api/ApiError');

const errorHandler = (err, req, res, next) => {
    // Default to a 500 status code if not already set
    let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    console.log(err);
    // Create the response object
    let response = {
        success: false,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        errors: err.errors,
    };

    // If the error is an instance of ApiError, use its properties
    if (err instanceof ApiError) {
        response = {
            ...response,
            statusCode: err.statusCode,
            errors: err.errors,
        };
    }

    // Send the response
    res.status(statusCode).json(response);
};

module.exports = { errorHandler };