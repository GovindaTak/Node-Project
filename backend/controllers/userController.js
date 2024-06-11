const { registerUser, findUserByEmail, findUserByEmpId, modifyUser,deleteUser ,getAllUsersFromService   } = require('../services/userService');
const LoginRequestDto = require('../dto/loginRequestDto');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');
const { verify, sendVerificationEmail } = require('../services/emailService')
const { UserResponseDto  } = require('../dto/userResponseDto')
const bcrypt = require("bcryptjs")
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


        const response = new ApiResponse(201, [{ user }], "User registered successfully");


        res.status(response.statusCode).json(response);
    } else {
        throw new ApiError(400, "User registration failed");
    }

});


const emailVerify = asyncHandler(async (req, res) => {

    const { token } = req.params;
    console.log(token)
    const isVerified = await verify(token);

    if (isVerified) {
        const response = new ApiResponse(200, [], "Your mail is verified");
        res.status(response.statusCode).json(response);
    } else {
        throw new ApiError(400, "Email verification is failed");
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
        console.log('***',updateUser);
        // Create response DTO
      const user = new UserResponseDto(updatedUser.empId, updatedUser.email, updatedUser.firstName, updatedUser.middleName, updatedUser.lastName, updatedUser.contactNumber, updatedUser.department, updatedUser.designation, updatedUser.image);
      console.log('***',user);
        // // Send success response
        // res.json(new ApiResponse(true, 'User data updated successfully', responseDto));

        //
        const response = new ApiResponse(202, [{user}], "User updated successfully");
        console.log('***',response);
        console.log("user res",response);

    res.status(response.statusCode).json(response);

});



const getAllUsers = asyncHandler(async (req, res) => {

    const pageSize = Number(req.query.pageSize) || 10; 
    const page = Number(req.query.pageNo) || 1;
    const sortBy = req.query.sortBy || 'firstName';
    const orderBy = req.query.orderBy === 'DESC' ? -1 : 1; 
    const filter = req.query.filter || ''; 
    const searchBy = req.query.searchBy || ''; 

    // const response = await getAllUsersFromService(pageSize,page,sortBy,orderBy, filter);
    // res.status(200).json(response);

    const { users, pageInfo } = await getAllUsersFromService(pageSize, page, sortBy, orderBy, filter,searchBy);
 

    const response = new ApiResponse(200, { users, pageInfo }, "Users retrieved successfully");

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


const deleteUserController = asyncHandler(async (req, res, next) => {
    const { empId } = req.params;

    if (!empId) {
        return next(new ApiError(400,[], 'Employee ID is required'));
    }
   
       const updatedUser= await deleteUser(empId);
       const user = new UserResponseDto(updatedUser.empId, updatedUser.email, updatedUser.firstName, updatedUser.middleName, updatedUser.lastName, updatedUser.contactNumber, updatedUser.department, updatedUser.designation, updatedUser.image);
        res.json(new ApiResponse(200,[{user}], 'User deleted successfully'));
   
});

module.exports = { register , updateUser,emailVerify,deleteUserController,getUserById,getAllUsers};
