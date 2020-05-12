const _ = require('lodash');
const UserService = require('../services/user');
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const { createUserSchema, loginUserSchema } = require('../schemas/user');


module.exports = {
    async getAllUsers(req, res) {

        try {
            const users = await UserService.getUsers(req.params);
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
            const { host } = req.headers

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
            const user = await UserService.createUser(req.body, host);

            return res.successResponse({
                message: 'User created successfully',
                data: _.pick(user, ['_id', 'first_name', 'last_name', 'user_name', 'email']),
            });
        } catch (e) {
            console.log(e);
        }
    },

    async login(req, res) {
        await loginUserSchema.validateAsync(req.body);
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
    },

    async signup(req, res) {
        await loginUserSchema.validateAsync(req.body);
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
    },

    async verifyAccount(req, res) {
        // await loginUserSchema.validateAsync(req.body);
        try {
            const { token } = req.query;
            const is_token = await TokenModel.findOne({ token });

            // check if token is valid
            if (!is_token) {
                return res.errorResponse({
                    message: 'We were unable to find a valid token. Your token my have expired.',
                    statusCode: 401,
                });
            }

            // Check if account has already been verified
            const user = await UserModel.findById(is_token.user_id);
            if (user.is_verified) {
                return res.errorResponse({
                    message: 'Your account has already been verified',
                    statusCode: 401,
                });
            }

            // verify if user exits
            if (String(user._id) !== is_token.user_id) {
                return res.errorResponse({
                    message: 'We were unable to find a user for this token.',
                    statusCode: 401,
                });
            }

            // update user record to verify = true
            await UserModel.findByIdAndUpdate({ _id: is_token.user_id }, { is_verified: true });

            return res.successResponse({
                message: 'The account has been verified. Please log in.',
            });
        } catch (e) {
            console.log(e);
        }
        // verify token


    },
}