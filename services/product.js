const ProductModel = require('../models/products');


module.exports = {
  async createProduct(params){
          const product = await ProductModel.create(params);
          return product;
  },
}