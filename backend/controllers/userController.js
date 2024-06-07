const { registerUser, findUserByEmail, findUserByEmpId, modifyUser } = require('../services/userService');
const LoginRequestDto = require('../dto/loginRequestDto');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');

const { verify, sendVerificationEmail } = require('../services/emailService')

const { UserResponseDto  } = require('../dto/userResponseDto')
// bcrypt
const bcrypt = require("bcryptjs")
// jwt
// const jwt = require("jsonwebtoken")
// jwt generator calling
const generateJWT = require("../utils/jwtGenerator");
const User = require('../models/userModel');




//empId, firstName, middleName, lastName, contactNumber, department, designation, image, email, password
const register = asyncHandler(async (req, res) => {
    const userRequestData = new UserRequestDto(
        req.body.empId,
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.contactNumber,
        req.body.department,
        req.body.designation,
        req.body.image,
        req.body.email,
        req.body.password
    );

    // Validate the request data
    UserRequestDto.validate(userRequestData);

    const newUser = await registerUser(userRequestData);
    

    if (newUser) {
        const user = new UserResponseDto(newUser.empId, newUser.email, newUser.firstName, newUser.middleName, newUser.lastName, newUser.contactNumber, newUser.department, newUser.designation, newUser.image);
       

        const response = new ApiResponse(201, [{user}], "User registered successfully");
       

        res.status(response.statusCode).json(response);
    } else {
        throw new ApiError(400, "User registration failed");
    }

});


const emailVerify = asyncHandler( async (req,res) => {
  
    const { token } = req.params;
    console.log(token)
    const isVerified = await verify(token);
    
    if(isVerified){
        const response = new ApiResponse(200, [], "Your mail is verified");
        res.status(response.statusCode).json(response);
    } else {
        throw new ApiError(400, "Email verification is failed");
    }

});
 
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
            console.error('Error sending verification email:', error);
            throw new ApiError(500, 'Something went wrong while sending the verification email.');
        }
    }

    const isMatch = await user.matchPassword(password); // Use the matchPassword method from the User model

    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }

    const payload = {
        user: {
            id: user.id,
            role:user.department
        },
    };

    try {
        const token = await generateJWT(payload);
        const response = new ApiResponse(200, { token }, "User logged in successfully");
        res.status(response.statusCode).json(response);
    } catch (err) {
        throw new ApiError(500, "Token generation failed");
    }
});

const updateUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.empId;
    const userRequestData = new UserRequestDto(
        req.body.empId,
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.contactNumber,
        req.body.department,
        req.body.designation,
        req.body.image,
        req.body.email,
        req.body.password
    );

    // Validate the request data
    UserRequestDto.validate(userRequestData);
        // Update user data using service
        const updatedUser = await modifyUser(userRequestData);

        // Create response DTO
      const user = new UserResponseDto(updatedUser.empId, updatedUser.email, updatedUser.firstName, updatedUser.middleName, updatedUser.lastName, updatedUser.contactNumber, updatedUser.department, updatedUser.designation, updatedUser.image);

        // // Send success response
        // res.json(new ApiResponse(true, 'User data updated successfully', responseDto));

        //
        const response = new ApiResponse(202, [{user}], "User updated successfully");
        console.log("user res",response);

        res.status(response.statusCode).json(response);
  
});

// get user by id
const getUserById = asyncHandler(async (req, res) => {
    const empId = req.params.empId;
    const user = await findUserByEmpId(empId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const userResponse = new UserResponseDto(
        user.empId,
        user.email,
        user.firstName,
        user.middleName,
        user.lastName,
        user.contactNumber,
        user.department,
        user.designation,
        user.image
    );

    const response = new ApiResponse(200, [{ user: userResponse }], "User fetched successfully");
    res.status(response.statusCode).json(response);
});


module.exports = { register, login, updateUser, emailVerify, getUserById };