const jwt = require('jsonwebtoken');
const {ApiError} = require('../api/ApiError');
const User = require('../models/userModel'); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
    try {
        // Extract token from headers
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new ApiError(401, 'No token provided');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user object to request for further middleware or route handlers
      //  req.user = await User.findById(decoded.empId);
        req.role= decoded.user.role;

        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid token'));
    }
};

const authorizeDepartment = (department) => (req, res, next) => {
    // if (req.user.department !== department) {
    //     return next(new ApiError(403, 'Forbidden'));
    // }
    if (req.role !== department) {
        return next(new ApiError(403, 'You UnAuthorized to access this resource !!!'));
    }
    next();
};

module.exports = { authenticateUser, authorizeDepartment };
