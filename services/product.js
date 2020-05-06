// const ElasticSearchClient = require('terra-es');
// const Product = require('../models/products');

// module.exports = {
//   async addProduct(data) {
//     return Product.indexOne(data);
//   },

//   async getProduct(id) {
//     return Product.get(id);
//   },

//   async updateProduct(id, update) {
//     return Product.update(id, update);
//   },

//   async deleteProduct(id) {
//     return Product.delete(id);
//   },

//   async getAllProducts() {
//     const { documents, total } = await Product.search(null, { returnCount: true });
//     return {
//       products: documents,
//       count: total,
//     };
//   },

//   getOutOfStockProducts() {
//     const builder = ElasticSearchClient.builder();

//     const requestBody = builder.requestBodySearch()
//       .query(builder.matchQuery('out_of_stock', '1'));

//     return Product.search(requestBody);
//   },

//   addManyProducts(productsBody) {
//     return Product.indexMany(productsBody);
//   },

//   count() {
//     return Product.count();
//   },

// };
