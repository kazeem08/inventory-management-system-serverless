const mongoose = require('mongoose');

const { Schema } = mongoose;

const salesSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
    },
    customer_name: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true,
    },
    billing_address: {
        type: String,
        required: true,
    },
    invoice_date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        default: 'invoice',
        required: true,
    },
    due_date: {
        type: String,
    },
    products: {
        type: Array,
        required: true,
    }, 
    client_id: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    total_after: {
        type: Number,
        default: 0,
        required: true,
    },
    total_before: {
        type: Number,
        default: 0,
    },
    amount_received: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: 'unpaid',
    },
    tax: {
        type: Number,
        default: 0,
    },
    invoice_no: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const salesModel = mongoose.model('sales', salesSchema);

module.exports = salesModel;