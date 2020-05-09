const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
    client_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    client_email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    }, 
}, {
    timestamps: true,
});

const ClientModel = mongoose.model('clients', clientSchema);


module.exports = ClientModel;