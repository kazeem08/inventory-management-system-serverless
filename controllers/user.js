const _ = require('lodash');
const UserService = require('../services/user');
const UserModel = require('../models/user');
const { createUserSchema } = require('../schemas/user');


module.exports = {
    async getAllUsers(req, res) {

        try {
            const users = await UserService.getUsers(req.params);
            console.log(users);
            return res.successResponse({
                message: (users.length < 1) ? 'No user available' : 'Successful',
                data: users,
                total: 0,
            });
        } catch (e) {
            console.log(e);
        }
    },

    async getUserById(req, res) {
        try {
            const { _id } = req.user;

            const user = await UserService.findUserById(_id);

            if (!user) {
                return res.errorResponse({
                    message: `User not found`,
                    statusCode: 404,
                })
            }
            return res.successResponse({
                message: 'User fetched succesfully',
                data: user,
            });
        } catch (e) {
            console.log(e);
        }
    },

    async createUser(req, res) {
        await createUserSchema.validateAsync(req.body);

        try {
            const { role, _id } = req.user;

            // check if user has admin privilege
            if (role !== 'admin') {
                return res.errorResponse({
                    message: 'Unauthorized Access',
                    statusCode: 401,
                })
            }

            const user_record = await UserModel.findOne({ email: req.body.email });
            if (user_record) {
                return res.errorResponse({
                    message: 'User already exist',
                    statusCode: 404,
                })
            }

            req.body._id = _id;
            const user = await UserService.createUser(req.body);

            return res.successResponse({
                message: 'User created successfully',
                data: _.pick(user, ['_id', 'first_name', 'last_name', 'user_name', 'email']),
            });
        } catch (e) {
            console.log(e);
        }

    },

    async login(req, res) {
        const token = await UserService.login(req.body);
        if (token) {
            return res.successResponse({
                message: 'User successfully login',
                data: { token },
            });
        };

        return res.errorResponse({
            message: 'Invalid username/password',
        });

    }
}