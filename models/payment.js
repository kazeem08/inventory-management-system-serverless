const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
    customer_name: {
        type: String,
        required: true,
    },
    invoice_no: {
        type: String,
        required: true,
    },
    amount_received: {
        type: Number,
        required: true,
    },
    invoice_date: {
        type: Date,
        required: true,
    }, 
    due_date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const PaymentModel = mongoose.model('payments', paymentSchema);


module.exports = PaymentModel;