const SalesModel = require('../models/sales');
const UserModel = require('../models/user');
const CustomerModel = require('../models/customer');
const ProductModel = require('../models/product');
const config = require('../config');


module.exports = {
  async createSales(params) {
      const body = params;
    
    // const { client_id } = await UserModel.findById(id);

    const { customer_id, products } = body;

    const { company_name, email, billing_address, client_id} = await CustomerModel.findById(customer_id);
    const temp = [];

    for(let elem of products){
        const {sales_price} = await ProductModel.findById(elem.product_id);
        elem.total_before = sales_price * elem.quantity;
        elem.total_after = elem.total_before * +(config.tax);

        temp.push(elem);
    }


    body.client_id = client_id;
    body.customer_name = company_name;
    body.customer_email = email;
    body.billing_address = billing_address;
    body.products = temp;

    console.log(body);
    const sales = await SalesModel.create(body);
    return sales;
  },

  async getAll(id) {
    const { client_id } = await UserModel.findById(id);

    const sales = await SalesModel.find({client_id});
    return sales;
  },

  async findProductById(id) {
    const sales = await SalesModel.findById(id);
    return sales;
  },
}