const { registerUser } = require('../services/userService');
const { ApiError } = require('../api/ApiError');
const { ApiResponse } = require('../api/ApiResponse');
const asyncHandler = require('../api/asyncHandler')
const { UserRequestDto  } = require('../dto/userRequestDto');
const { UserResponseDto  } = require('../dto/userResponseDto');
const { verify } = require('../services/emailService')


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

})


module.exports = { register, emailVerify }

