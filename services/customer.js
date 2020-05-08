const CustomerModel = require('../models/customer');
const UserModel = require('../models/user');


module.exports = {
  async addCustomer(params, id) {
    const body = params;

    // get client_id from users' record
    const { client_id } = await UserModel.findById(id);
    body.client_id = client_id;

    const customer = await CustomerModel.create(body);
    return customer;
  },

  async getAllCustomers(id) {
    const { client_id } = await UserModel.findById(id);

    const customer = await CustomerModel.find({client_id});
    return customer;
  },

  async findProductById(id) {
    const customer = await CustomerModel.findById(id);
    return customer;
  },
}