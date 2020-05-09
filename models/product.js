const mongoose = require('mongoose');

const { Schema } = mongoose;


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  client_id:{
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'inventory'
  },
  sales_price: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  reorder_point: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
   tax: {
    type: Number,
    default: 0.05,
  },
}, {
  timestamps: true,
});

const ProductModel = mongoose.model('products', productSchema);


module.exports = ProductModel;