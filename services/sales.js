const SalesModel = require('../models/sales');
const UserModel = require('../models/user');
const CustomerModel = require('../models/customer');
const ProductModel = require('../models/product');
const ClientModel = require('../models/client');
const PaymentModel = require('../models/payment');

const config = require('../config');


module.exports = {
    async createSales(params) {
        const body = params;

        const { customer_id, products, tax, type } = body;

        const { company_name, client_id, email, billing_address, balance: customer_balance } = await CustomerModel.findById(customer_id);
        const temp = [];
        let total_before = 0;
        let total_after = 0;

        for (let elem of products) {
            const { sales_price } = await ProductModel.findById(elem.product_id);
            total_before += sales_price * elem.quantity;

            temp.push(elem);
        }

        if (tax) {
            total_after = (total_before * +(config.tax)) + total_before;
            body.tax = +(config.tax) * total_before;
        } else {
            total_after = total_before;
        }

        body.client_id = client_id;
        body.customer_name = company_name;
        body.customer_email = email;
        body.billing_address = billing_address;
        body.total_before = total_before;
        body.total_after = total_after;

        if (type === 'sales') {
            body.balance = 0;
            body.status = 'paid';
        } else {
            body.balance = total_after;
        }

        let count = await SalesModel.count();
        console.log('COUNTERERRR', count);
        body.invoice_no = ++count;
        const sales = await SalesModel.create(body);

        const new_customer_balance = customer_balance + total_after;
        await CustomerModel.findByIdAndUpdate({_id: customer_id },{balance: new_customer_balance});

        for (let elem of temp) {
            const { quantity } = await ProductModel.findById(elem.product_id);
            const new_quantity = quantity - elem.quantity;
            console.log(elem.product_id, quantity, new_quantity);
            await ProductModel.findByIdAndUpdate({ _id: elem.product_id }, { quantity: new_quantity });
        }

        let { balance } = await ClientModel.findById(client_id);
        await ClientModel.findByIdAndUpdate({ _id: client_id }, { balance: balance += total_before });
        return sales;
    },

    async getSales(id) {
        const { client_id } = await UserModel.findById(id);

        const sales = await SalesModel.find({ client_id });

        return sales;
    },

    async findProductById(id) {
        const sales = await SalesModel.findById(id);
        return sales;
    },

    async makePayment(params) {
        const body = params;
        const { payments, customer_id } = body;

        const { company_name: customer_name } = await CustomerModel.findById(customer_id);

        let total_amount_paid = 0;
        const temp = [];
        // loop through payments and update sales balance
        for (let elem of payments) {
            const { balance, invoice_no, invoice_date, due_date } = await SalesModel.findById(elem._id);
            const remaining_balance = balance - elem.amount_received;
            // const remaining_balance = total_after - total_paid;

            const payment_obj = {
                customer_name,
                invoice_no,
                amount_received: elem.amount_received,
                invoice_date,
                due_date,
            }

            temp.push(payment_obj); //push payments object into an arrya to be indexed later
            total_amount_paid += elem.amount_received; //tract total amount paid

            const update_params = { balance: remaining_balance }

            if(remaining_balance <= 0){
                update_params.status = 'paid';
            }
            //find sales and update balance
            await SalesModel.findOneAndUpdate({ _id: elem._id }, update_params);
        };

        //insert payment object
        await PaymentModel.insertMany(temp);

        // Get customer blance, subtract total amount paid amd update with new balance
        const { balance } = await CustomerModel.findById(customer_id);
        const new_balance = balance - total_amount_paid;

        const update_balance = await CustomerModel.findByIdAndUpdate({_id: customer_id}, {balance: new_balance});
        return update_balance;

    }
}