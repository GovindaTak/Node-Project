const { registerUser } = require('../services/userService');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');
const { UserResponseDto  } = require('../dto/userResponseDto')

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

module.exports = { register }

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