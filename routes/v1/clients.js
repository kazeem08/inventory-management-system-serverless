const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const ClientController = require('../../controllers/client');


route.get('/', asyncHandler((req, res) => ClientController.getAllClients(req, res)));

route.get('/:id', asyncHandler((req, res) => ClientController.getProduct(req, res)));

route.post('/', asyncHandler((req, res) => ClientController.createClient(req, res)));

route.put('/:id', asyncHandler((req, res) => ClientController.updateProduct(req, res)));

route.delete('/:id', asyncHandler((req, res) => ClientController.deleteProduct(req, res)));

route.put('/', asyncHandler((req, res) => ClientController.insertManyProducts(req, res)));


module.exports = route;
