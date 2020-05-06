const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;