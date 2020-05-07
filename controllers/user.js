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
            const {role, _id} = req.user;

            // check if user has admin privilege
            if(role !== 'Admin'){
                return res.errorResponse({
                    message: 'Unauthorized Access',
                    statusCode: 401,
                })
            }
            
            req.body._id = _id;
            const users = await UserService.createUser(req.body);

            return res.successResponse({
                message: (users.length < 1) ? 'No user available' : 'Successful',
                data: users,
                total: 0,
              });
        } catch(e){
            console.log(e);
        }
       
    },

    async login(req, res){
        const token = await UserService.login(req.body);
        if(token){
            return res.successResponse({
                message: 'User successfully login',
                data: { token },
              });
        };

        return res.errorResponse({
            message: 'Invalid username/password',
        })
       

    }
}