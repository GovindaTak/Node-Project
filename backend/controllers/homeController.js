const { registerUser } = require('../services/userService');
const { findUserByEmail } = require('../services/userService')
const { findUserByEmpId, modifyUser } = require('../services/userService')
const LoginRequestDto = require('../dto/loginRequestDto');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');
const { verify, sendVerificationEmail } = require('../services/emailService')
const generateJWT = require("../utils/jwtGenerator");
const { UserResponseDto  } = require('../dto/userResponseDto')
// bcrypt
const bcrypt = require("bcryptjs")

const sendEmail = require('../utils/sendEmail');
const User = require('../models/userModel'); // Assuming you have a User model

const {generateRandomPassword}=require('../utils/utilityFunctions') 


//----------------------------------


// Login controller
const login = asyncHandler(async (req, res) => {
    const { email, empId, password } = req.body;
    const loginRequestData = new LoginRequestDto(email, empId, password);

    // Validate the login request data
    LoginRequestDto.validate(loginRequestData);

    let user;
    if (email) {
        user = await findUserByEmail(email);
    } else if (empId) {
        user = await findUserByEmpId(empId);
    }

    if (!user) {
        throw new ApiError(400, "Invalid credentials");
    }

    // To check if user's email is verified or not
    if (!user.isVerified) {
        try {
            await sendVerificationEmail(user);
            throw new ApiError(403, "Your Email is not verified. We have sent an email. Check and Verify your mail to login");
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, error.message);
    }
    }
    const isMatch = await user.matchPassword(password); // Use the matchPassword method from the User model

    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }

    const payload = {
        user: {
            id: user.id,
            role: user.department
        },
    };

    try {
        const token = await generateJWT(payload);
        const response = new ApiResponse(200, { user, token }, "User logged in successfully");
        res.status(response.statusCode).json(response);
    } catch (err) {
        throw new ApiError(500, "Token generation failed");
    }
});

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

module.exports = { forgetPassword ,login};
