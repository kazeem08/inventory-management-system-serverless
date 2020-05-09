const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const CustomersController = require('../../controllers/customer');


route.get('/', asyncHandler((req, res) => CustomersController.getAllCustomers(req, res)));

route.get('/:id', asyncHandler((req, res) => CustomersController.getProductById(req, res)));

route.post('/', asyncHandler((req, res) => CustomersController.createCustomer(req, res)));

route.put('/:id', asyncHandler((req, res) => CustomersController.updateProduct(req, res)));

route.delete('/:id', asyncHandler((req, res) => CustomersController.deleteProduct(req, res)));

route.put('/', asyncHandler((req, res) => CustomersController.insertManyProducts(req, res)));


module.exports = route;
