const User = require('../models/userModel');
const { ApiError } = require('../api/ApiError');

const registerUser = async (userData) => {
    try {
        const {
            empId,
            firstName,
            middleName,
            lastName,
            email,
            contactNumber,
            password,
            department,
            designation,
            image
        } = userData;
    
        const userExists = await User.findOne({ email });
    
        if (userExists) {
            // User already exists error
            throw new ApiError(400, 'User already exists');
        }

        const user = await User.create({
            empId,
            firstName,
            middleName,
            lastName,
            email,
            contactNumber,
            password,
            department,
            designation,
            image
        });

        if (!user) {
            throw new ApiError(500, 'User creation failed');
        }
    
        return user;

    } catch (error) {
        // If error is an instance of ApiError, rethrow it, otherwise create a new ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("***********",error.message);
        throw new ApiError(500, error.message);
    }
};


module.exports = { registerUser }