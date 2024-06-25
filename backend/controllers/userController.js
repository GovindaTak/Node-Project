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
const cloudinary = require('../utils/cloudinary');
const { uploadImage } = require('../utils/utilityFunctions');




//empId, firstName, middleName, lastName, contactNumber, department, designation, image, email, password
const register = asyncHandler(async (req, res) => {
    let imageUrl = '';
    console.log(req.file);
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'profile_pictures'
        });
        imageUrl = result.secure_url;
    }

    const userRequestData = new UserRequestDto(
        req.body.empId,
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.contactNumber,
        req.body.department,
        req.body.designation,
        imageUrl,
        req.body.email,
        req.body.password
    );

    // Validate the request data
    UserRequestDto.validate(userRequestData);

    const newUser = await registerUser(userRequestData);


    if (newUser) {
        const user = new UserResponseDto(newUser.empId, newUser.email, newUser.firstName, newUser.middleName, newUser.lastName, newUser.contactNumber, newUser.department, newUser.designation, newUser.image,newUser._id);


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
    const userId = req.params.Id;
  
    const userRequestData = new UserRequestDto(
        req.body.empId,
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.contactNumber,
        req.body.department,
        req.body.designation,
        null,
        req.body.email,
        req.body.password
    );

    // Validate the request data
    UserRequestDto.validate(userRequestData);
    const newImage=await uploadImage(req.file);
    userRequestData.image=newImage==null?req.body.image:newImage;

    console.log('***',userRequestData);
        // Update user data using service
        const updatedUser = await modifyUser(userRequestData);
        console.log('***',updatedUser);
        // Create response DTO
      const user = new UserResponseDto(updatedUser.empId, updatedUser.email, updatedUser.firstName, updatedUser.middleName, updatedUser.lastName, updatedUser.contactNumber, updatedUser.department, updatedUser.designation, updatedUser.image,updatedUser._id);
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
    const empId = req.params.Id;
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
        user.image,
        user._id
    );

    const response = new ApiResponse(200, [{ user: userResponse }], "User fetched successfully");
    res.status(response.statusCode).json(response);
});


const deleteUserController = asyncHandler(async (req, res, next) => {
    const { Id } = req.params;

    if (!Id) {
        return next(new ApiError(400,[], 'User ID is required'));
    }
   
       const updatedUser= await deleteUser(Id);
       const user = new UserResponseDto(updatedUser.empId, updatedUser.email, updatedUser.firstName, updatedUser.middleName, updatedUser.lastName, updatedUser.contactNumber, updatedUser.department, updatedUser.designation, updatedUser.image,Id);
        res.json(new ApiResponse(200,[{user}], 'User deleted successfully'));
   
});



module.exports = { register , updateUser,emailVerify,deleteUserController,getUserById,getAllUsers};
