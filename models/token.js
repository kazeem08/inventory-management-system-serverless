const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }, 
}, {
    timestamps: true,
});

const TokenModel = mongoose.model('tokens', tokenSchema);


module.exports = TokenModel;