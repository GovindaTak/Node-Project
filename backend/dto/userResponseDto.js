// UserResponseDto.js
class UserResponseDto {
    constructor(empId, email, firstName, middleName, lastName, contactNumber, department, designation, image) {
        this.empId = empId;
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.department = department;
        this.designation = designation;
        this.image = image;
    }
}

module.exports = UserResponseDto;
