const UserModel = require('../models/user');

module.exports = {
    async getUsers(params){
        // await UserModel.find({});
        return ['kazeem'];
    }
}