const ProductModel = require('../models/products');


module.exports = {
  async createProduct(params) {
    const product = await ProductModel.create(params);
    return product;
  },

  async getAll(params) {
    const product = await ProductModel.find();
    return product;
  },

  async findProductById(id) {
    const product = await ProductModel.findById(id);
    return product;
  },
}