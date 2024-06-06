import Validator from "../utils/validator";
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
            throw new Error('Either email or employee ID is required');
        }

        // Validate email using regex
        if (email && !Validator.isValidEmail(email)) {
            throw new Error('Invalid email address');
        }

        // Validate password using regex
        if (password && !Validator.isValidPassword(password)) {
            throw new Error('Invalid password');
        }
    }
}

 

module.exports = LoginRequestDto;
