const ProductModel = require('../models/product');
const UserModel = require('../models/user');


module.exports = {
  async createProduct(params, id) {
    const body = params;
    const { client_id } = await UserModel.findById(id);
    body.client_id = client_id;
    const product = await ProductModel.create(body);
    return product;
  },

  async getAll(id) {
    const { client_id } = await UserModel.findById(id);

    const product = await ProductModel.find({client_id});
    return product;
  },

  async findProductById(id) {
    const product = await ProductModel.findById(id);
    return product;
  },
}