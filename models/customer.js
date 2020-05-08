const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
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
    company_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    }, 
    phone_numbers: {
        type: Array,
        required: true,
    },
    billing_address: {
        type: String,
        required: true,
    },
    shipping_address: {
        type: String,
        required: true,
    }, 
    client_id: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const customerModel = mongoose.model('customers', customerSchema);

module.exports = customerModel;