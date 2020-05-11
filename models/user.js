const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
    },
    last_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Array,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }, 
    client_id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    write: {
        type: Boolean,
        default: false,
        required: true
    },
    is_verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

// module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports = UserModel;