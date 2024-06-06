import Validator from "../utils/validator";
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
            throw new Error('First name and last name are required');
        }

        if (!/^[6789]\d{9}$/.test(contactNumber)) {
            throw new Error('Invalid contact number');
        }

        if (!department || !designation) {
            throw new Error('Department and designation are required');
        }

        if (email && !Validator.isValidEmail(email)) {
            throw new Error('Invalid email address');
        }

        if (password && !Validator.isValidPassword(password)) {
            throw new Error('Invalid password');
        }
    }
}


module.exports = UserRequestDto;
