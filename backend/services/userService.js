const User = require('../models/userModel');

const { ApiError } = require('../api/ApiError');
const {sendVerificationEmail} = require('./emailService');




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

        try {
            await sendVerificationEmail(user);
        } catch (emailError) {
            console.error('Email verification failed:', emailError);
            // If sending verification email fails, delete the created user
            await User.findByIdAndDelete(user._id);
            throw new ApiError(500, 'Registration failed, please try again');
        }

        return user;

    } catch (error) {
        // If error is an instance of ApiError, rethrow it, otherwise create a new ApiError
        if (error instanceof ApiError) {
            throw error;
        }
      
        throw new ApiError(500, error.message);
    }
};

//login service 

// Function to find a user by email
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user;
    } catch (error) {
        // If error is an instance of ApiError, rethrow it, otherwise create a new ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, error.message);
    }
};

// Function to find a user by employee ID
const findUserByEmpId = async (empId) => {
    try {
        const user = await User.findOne({ empId });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user;
    } catch (error) {
        // If error is an instance of ApiError, rethrow it, otherwise create a new ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, error.message);
    }
};

const modifyUser = async (userData) => {
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

    // Find user by ID
    let user =  await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Update user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName=middleName;
    user.contactNumber=contactNumber;
    user.image=image;
    user.department=department;
    user.designation=designation;
    user.password=password;

    // Save updated user data
    try{
    user = await user.save();
    }
    catch(error)
    {
        return new ApiError(500, error.message);
    }
    return user;
};

const deleteUser = async (empId) => {
    const user = await User.findOneAndDelete({ empId });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};

module.exports = {
    registerUser,
    findUserByEmail,
    findUserByEmpId,
    modifyUser,
    deleteUser
};