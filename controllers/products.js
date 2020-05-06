const ProductService = require('../services/product');
const { createProductSchema } = require('../schemas/products');

module.exports = {
  async addProduct(req, res) {

    logger.debug('Adding Product');

    await createProductSchema.validateAsync(req.body);

    const response = await ProductService.addProduct(req.body);

    logger.info('new product saved to elasticsearch ', req.body);

    await AwsSqs.sendMessage('MyQueue', { message: 'Product Created' });

    logger.info('message sent to SQS');

    res.successResponse({
      message: 'Product Successfully Created',
      data: response,
    });
  },

  async updateProduct(req, res) {
    res.successResponse({
      message: 'Product Successfully Updated',
      data: await ProductService.updateProduct(req.params.id, req.body),
    });
  },

  async deleteProduct(req, res) {
    const logger = TerraLogger.fromContext(req);

    const { id } = req.params;

    logger.info('deleting product', id);

    res.successResponse({
      message: 'Product Successfully Delete',
      data: await ProductService.deleteProduct(id),
    });
  },

  async getAllProducts(req, res) {
    const { products, count } = await ProductService.getAllProducts();
    res.successResponse({
      message: 'Products Fetched Successfully',
      headers: {
        'x-total-count': count,
      },
      data: products,
    });
  },

  async getProduct(req, res) {
    res.successResponse({
      message: 'Product Fetched Successfully',
      data: await ProductService.getProduct(req.params.id),
    });
  },

  async insertManyProducts(req, res) {
    const products = req.body;

    // validate all products
    const validations = products.map((product) => createProductSchema.validateAsync(product));
    await Promise.all(validations);

    res.successResponse({
      message: 'Products Successfully Created',
      data: await ProductService.addManyProducts(products),
    });
  },

};
