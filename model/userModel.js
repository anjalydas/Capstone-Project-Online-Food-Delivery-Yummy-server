const mongoose = require('mongoose');
const userSchema = new mongoose.Schema
    ({  name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
    },
    mobile: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
        password:  {
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic: {
            type: String
        },
        role: {
            type: String,
            enum: ["customer", "vender"],
        },
    });
   

const User = mongoose.model('User', userSchema)
module.exports = User