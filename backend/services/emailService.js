const { ApiError } = require('../api/ApiError');
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const sendVerificationEmail = async (user) => {

    const empId = user.empId;
    const email = user.email;
    const name = user.firstName;
    
    const token = jwt.sign({ empId }, process.env.JWT_EMAIL_SECRET);


    const options = {
        email,
        subject : 'Account Verification Link',
        message : `Hello, ${name} Please verify your email by
        clicking this link :
        http://localhost:5001/api/v1/users/verify-email/${token} `,
    }
    try{
       
        await sendEmail(options);

    } catch(error) {
        console.error('Error sending verification email:', error);
        throw new ApiError(400, 'Something went wrong, please register again');

    }

    
}

const verify = async (token) => {

    try {
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        const empId = decoded.empId;

        const user = await User.findOne({ empId }).select('-password');
        if (!user) {
            throw new ApiError(400, 'User not found');
        }

        if (user.isVerified) {
            throw new ApiError(400, 'Email is already verified');
        }

        user.isVerified = true;
        await user.save();
        return true;

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error(error);
        throw new ApiError(400, 'Email verification failed');
    }

}



module.exports = {sendVerificationEmail,verify};