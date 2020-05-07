const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
;
const UserModel = require('../models/user');

module.exports = {
    async getUsers(params){
        const result = await UserModel.find();
        console.log('RESULT',  result);
        return result;
    },

    async createUser(params){
        const body = params;
        let { password } = body;
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);
        const result = await UserModel.create(body);
        return result;
    },

    async login(params){
        const {email, password} = params;
        const user = await UserModel.findOne({email});

        if(!user) return;

        const is_password = await bcrypt.compare(password, user.password);
        if(!is_password) return;

        const token = jwt.sign({ _id: this._id, role: this.role }, process.env.jwtPrivateKey);
	    return token;
        

    }
}