const SalesModel = require('../models/sales');
const UserModel = require('../models/user');
const CustomerModel = require('../models/customer');
const ProductModel = require('../models/product');
const ClientModel = require('../models/client');

const config = require('../config');


module.exports = {
  async createSales(params) {
      const body = params;
    
    const { customer_id, products } = body;

    const { company_name, client_id, email, billing_address} = await CustomerModel.findById(customer_id);
    const temp = [];
    let total_before = 0;

    for(let elem of products){
        const {sales_price} = await ProductModel.findById(elem.product_id);
        total_before += sales_price * elem.quantity;

        temp.push(elem);
    }

    const total_after = (total_before * +(config.tax)) + total_before;

    body.client_id = client_id;
    body.customer_name = company_name;
    body.customer_email = email;
    body.billing_address = billing_address;
    body.total_before = total_before;
    body.total_after = total_after;

    const sales = await SalesModel.create(body);

    for(let elem of temp){
        const { quantity } = await ProductModel.findById(elem.product_id);
        const new_quantity = quantity - elem.quantity;
        console.log(elem.product_id, quantity, new_quantity);
        await ProductModel.findByIdAndUpdate({_id: elem.product_id},{quantity: new_quantity});
    }

    let { balance } = await ClientModel.findById(client_id);
    await ClientModel.findByIdAndUpdate({_id: client_id}, {balance: balance +=total_before})
    return sales;
  },

  async getSales(id) {
    const { client_id } = await UserModel.findById(id);

    const sales = await SalesModel.find({client_id});
    
    return sales;
  },

  async findProductById(id) {
    const sales = await SalesModel.findById(id);
    return sales;
  },

  async findSalesById(id){
    const sales = await SalesModel.findById(id);
    return sales;
  }
}