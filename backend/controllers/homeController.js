const { registerUser } = require('../services/userService');
const { findUserByEmail } = require('../services/userService')
const { findUserByEmpId, modifyUser } = require('../services/userService')
const LoginRequestDto = require('../dto/loginRequestDto');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');

const { verify } = require('../services/emailService')

const { UserResponseDto  } = require('../dto/userResponseDto')
// bcrypt
const bcrypt = require("bcryptjs")

const sendEmail = require('../utils/sendEmail');
const User = require('../models/userModel'); // Assuming you have a User model

const {generateRandomPassword}=require('../utils/utilityFunctions') 


//----------------------------------

const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email, empId } = req.query;

    if (!email || !empId) {
        return next(new ApiError(400, 'Email and Employee ID are required'));
    }
    console.log('***',email,'****',empId)
    // Find user by email and empId
    const user = await User.findOne({ email, empId });

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    // Generate new default password
    const defaultPassword = generateRandomPassword();

    // Set the user's password to the new default password
    user.password = defaultPassword; // Assume you have password hashing middleware on save
    await user.save();

    // Send email notification with new password
    const message = `Your password has been reset. Your new default password is: ${defaultPassword}`;
    await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message,
    });

    // Send success response
    res.json(new ApiResponse(202, [],'Password reset successfully. Check your email for the new password.'));
});

module.exports = { forgetPassword };
