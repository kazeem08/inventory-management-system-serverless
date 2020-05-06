const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports = {
    async getUsers(params){
        const result = await UserModel.find();
        console.log('RESULT',  result);
        // return ['kazeem'];
        return result;
    },

    async createUser(params){
        const body = params;
        let { password } = body;
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);
        const result = await UserModel.create(body);
        // return ['kazeem'];
        return result;
    }
}