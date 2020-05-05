const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const ProductsController = require('../../controllers/products');


route.get('/', asyncHandler((req, res) => ProductsController.getAllProducts(req, res)));

route.get('/:id', asyncHandler((req, res) => ProductsController.getProduct(req, res)));

route.post('/', asyncHandler((req, res) => ProductsController.addProduct(req, res)));

route.put('/:id', asyncHandler((req, res) => ProductsController.updateProduct(req, res)));

route.delete('/:id', asyncHandler((req, res) => ProductsController.deleteProduct(req, res)));

route.put('/', asyncHandler((req, res) => ProductsController.insertManyProducts(req, res)));


module.exports = route;
