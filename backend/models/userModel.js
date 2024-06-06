const mongoose = require('mongoose');

// Creating User(employee) schema
const userSchema = mongoose.Schema(
    {

        empId: {
            type: Number,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.trim().length > 0,
                message: 'First name is required and cannot be all spaces.'
            }
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.trim().length > 0,
                message: 'Last name is required and cannot be all spaces.'
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[\w.]{2,}@atmecs\.com$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[6789]\d{9}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password`
            },
        },
        department : {
            type: String,
            required: true,
        },
        designation : {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            allowNull: true,
            
        },

    },
    {
        timestamps: true,
    }
    
);

const User = mongoose.model('User', userSchema);

module.exports = User;