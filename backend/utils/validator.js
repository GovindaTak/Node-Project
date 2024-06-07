// validator.js
class Validator {
    // Validate email using regex
    static isValidEmail(email) {
        // return /^[\w.]{2,}@atmecs\.com$/.test(email);
        return /^[\w]{2,}@gmail\.com$/.test(email);
    }

    // Validate password using regex
    static isValidPassword(password) {
        // Add your password validation regex here
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/.test(password);
    }
}

module.exports = Validator;
