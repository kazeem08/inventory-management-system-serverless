const UserModel = require('../models/user');

module.exports = {
    async getUsers(params){
        const result = await UserModel.find();
        console.log('RESULT',  result);
        // return ['kazeem'];
        return result;
    },

    async createUser(params){
        const result = await UserModel.create(params);
        console.log('RESULT',  result);
        // return ['kazeem'];
        return result;
    }
}