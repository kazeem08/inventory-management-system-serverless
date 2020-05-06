const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    client_id: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

// module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports = UserModel;