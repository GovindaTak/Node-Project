// validator.js
class Validator {
    // Validate email using regex
    static isValidEmail(email) {
        return /^[\w.]{2,}@atmecs\.com$/.test(email);
    }

    // Validate password using regex
    static isValidPassword(password) {
        // Add your password validation regex here
        return /^[6789]\d{9}$/.test(password);
    }
}

module.exports = Validator;
