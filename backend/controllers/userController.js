const { registerUser } = require('../services/userService');
const { findUserByEmail } = require('../services/userService')
const { findUserByEmpId, modifyUser } = require('../services/userService')
const LoginRequestDto = require('../dto/loginRequestDto');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');
const { UserResponseDto  } = require('../dto/userResponseDto')
// bcrypt
const bcrypt = require("bcryptjs")
// jwt
// const jwt = require("jsonwebtoken")
// jwt generator calling
const generateJWT = require("../utils/jwtGenerator");


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
    console.log("user service",newUser);

    if (newUser) {
        const user = new UserResponseDto(newUser.empId, newUser.email, newUser.firstName, newUser.middleName, newUser.lastName, newUser.contactNumber, newUser.department, newUser.designation, newUser.image);
        console.log("user dto",user);

        const response = new ApiResponse(201, [{user}], "User registered successfully");
        console.log("user res",response);

        res.status(response.statusCode).json(response);
    } else {
        throw new ApiError(400, "User registration failed");
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

    const isMatch = await bcrypt.compare(password, user.password);

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

module.exports = { register, login , updateUser};

/*

 try {
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

        const user = await registerUser(userRequestData);

        if (user) {
            const userResponseData = new UserResponseDto(user);
            const response = new ApiResponse(201, userResponseData, "User registered successfully");
            res.status(response.statusCode).json(response);
        } else {
            throw new ApiError(400, "User registration failed");
        }
    } catch (error) {
        const apiError = new ApiError(400, error.message, [], error.stack);
        res.status(apiError.statusCode).json(apiError);
    }
*/

/*
    const { empId, firstName, middleName, lastName, email, contactNumber, password, department, designation, image } = req.body;
    const user = await registerUser({ empId, firstName, middleName, lastName, email, contactNumber, password, department, designation, image });

    if (user) {
        const response = new ApiResponse(201, [{ user }, { "name":"govinda"}], "User registered successfully");
        res.status(response.statusCode).json(response);
    } else {
        const error = new ApiError(400, "User registration failed");
        res.status(error.statusCode).json(error);
    }
*/