const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const UserController = require('../../controllers/user');


route.get('/', asyncHandler((req, res) => UserController.getAllUsers(req, res)));

route.get('/confirmation', asyncHandler((req, res) => UserController.verifyAccount(req, res)));

route.get('/:id', asyncHandler((req, res) => UserController.getUserById(req, res)));

route.post('/', asyncHandler((req, res) => UserController.createUser(req, res)));

route.post('/login', asyncHandler((req, res) => UserController.login(req, res)));

route.post('/signup', asyncHandler((req, res) => UserController.login(req, res)));

route.put('/:id', asyncHandler((req, res) => UserController.updateProduct(req, res)));

route.delete('/:id', asyncHandler((req, res) => UserController.deleteProduct(req, res)));

route.put('/', asyncHandler((req, res) => UserController.insertManyProducts(req, res)));


module.exports = route;
