const Validator = require("../utils/validator");
const { ApiError } = require('../api/ApiError');

class UserRequestDto {
    constructor(empId, firstName, middleName, lastName, contactNumber, department, designation, image, email, password) {
        this.empId = empId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.department = department;
        this.designation = designation;
        this.image = image;
        this.email = email;
        this.password = password;
    }

    static validate(employeeData) {
        const { firstName, lastName, contactNumber, department, designation, email, password } = employeeData;

        // Validation checks
        if (!firstName || !lastName) {
            throw new ApiError(400, 'First name and last name are required');
        }

        if (!/^[6789]\d{9}$/.test(contactNumber)) {
            throw new ApiError(400, 'Invalid contact number');
        }

        if (!department || !designation) {
            throw new ApiError(400, 'Department and designation are required');
        }

        if (email && !Validator.isValidEmail(email)) {
            throw new ApiError(400, 'Invalid email address');
        }

        if (password && !Validator.isValidPassword(password)) {
            throw new ApiError(400, 'Invalid password');
        }
    }
}

module.exports = {UserRequestDto };
