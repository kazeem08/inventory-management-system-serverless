const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const SalesController = require('../../controllers/sales');


route.get('/', asyncHandler((req, res) => SalesController.getAllSales(req, res)));

route.get('/:id', asyncHandler((req, res) => SalesController.getSalesById(req, res)));

route.post('/', asyncHandler((req, res) => SalesController.addSales(req, res)));

route.post('/payment', asyncHandler((req, res) => SalesController.makePayment(req, res)));

route.put('/:id', asyncHandler((req, res) => SalesController.updateProduct(req, res)));

route.delete('/:id', asyncHandler((req, res) => SalesController.deleteProduct(req, res)));

route.put('/', asyncHandler((req, res) => SalesController.insertManyProducts(req, res)));


module.exports = route;
