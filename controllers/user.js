const UserService = require('../services/user');

module.exports = {
    async getAllUsers(req, res){
        try{
            console.log('I AM HERRE');
            const users = await UserService.getUsers(req.params);
            console.log(users);
            return res.successResponse({
                message: (users.length < 1) ? 'No user available' : 'Successful',
                data: users,
                total: 0,
              });
        } catch(e){
            console.log(e);
        }
       
    },

    async createUser(req, res){
        try{
            console.log('I AM HERRE');
            const users = await UserService.createUser(req.body);
            console.log(users);
            return res.successResponse({
                message: (users.length < 1) ? 'No user available' : 'Successful',
                data: users,
                total: 0,
              });
        } catch(e){
            console.log(e);
        }
       
    }
}