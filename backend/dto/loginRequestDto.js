const Validator = require('../utils/validator');
const {ApiError} = require('../api/ApiError');

class LoginRequestDto {
    constructor(email, empId, password) {
        this.email = email;
        this.empId = empId;
        this.password = password;
    }

    static validate(userData) {
        const { email, empId, password } = userData;

        // Validate either email or empId is provided
        if (!email && !empId) {
            throw new ApiError(400, 'Either email or employee ID is required');
        }

        // Validate email using regex
        if (email && !Validator.isValidEmail(email)) {
            throw new ApiError(400, 'Invalid email address');
        }

        // Validate password using regex
        if (password && !Validator.isValidPassword(password)) {
            throw new ApiError(400, 'Invalid password');
        }
    }
}

module.exports = LoginRequestDto;