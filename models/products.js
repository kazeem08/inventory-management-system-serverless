
const elasticsearch = require('terra-es');

const mappings = {
  name: { type: 'text', fielddata: true },
  price: { type: 'long' },
  out_of_stock: { type: 'text' },
  created_on: { type: 'date' },
  updated_at: { type: 'date' },
  test_field: { type: 'text' },
  test_field2: { type: 'keyword' },
};


const ProductModel = elasticsearch.model('products', '_doc', mappings);

ProductModel.getAll = function () {
  return 'good';
};

module.exports = ProductModel;
