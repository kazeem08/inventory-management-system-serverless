const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AwsSqs = require('../lib/aws_sqs');

;
const UserModel = require('../models/user');

module.exports = {
    async getUsers(params){
        const result = await UserModel.find();
        console.log('RESULT',  result);
        return result;
    },

    async findUserById(id){
        const result = await UserModel.findOne({_id : id});
        console.log('RESULT',  result);
        return result;
    },

    async createUser(params){
        const body = params;
        let { password, _id } = body;

        //get client _id from admin details
        const { client_id } = await UserModel.findById(_id);
        body.client_id = client_id;  // add client_id to the user details
        delete body._id;

        // encypt password
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);

        //create user
        const result = await UserModel.create(body);
        AwsSqs.sendMessage(`${process.env.EMAIL_QUEUE}`, {subject: 'Hello', body: "Welcome", to: 'kaka_lanree@yahoo.com'});

        return result;
    },

    async login(params){
        const {email, password} = params;
        const user = await UserModel.findOne({email});

        if(!user) return;

        const is_password = await bcrypt.compare(password, user.password);
        if(!is_password) return;

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.jwtPrivateKey);
	    return token;
        

    }
}