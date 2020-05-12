const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AwsSqs = require('../lib/aws_sqs');
const TokenModel = require('../models/token');
const queue = require('../consumers/queue');

;
const UserModel = require('../models/user');

module.exports = {
    async getUsers(){
        const result = await UserModel.find();
        return result;
    },

    async findUserById(id){
        const result = await UserModel.findOne({_id : id});
        console.log('RESULT',  result);
        return result;
    },

    async createUser(params, host){
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

        const token = await jwt.sign(password, process.env.tokenKey);
        const link = `http://${host}/v1/users/confirmation?token=${token}`;

        console.log('TOKEN', token);
        console.log('LINKK', link);

    //    await AwsSqs.sendMessage(`${process.env.EMAIL_QUEUE}`, {
    //        subject: 'Hello', 
    //        body: `Hello, Please click the lnk below to verify your account
    //        ${link}

    //        password: ${password}
    //        `, 
    //        to: 'kaka_lanree@yahoo.com'});

           await queue.sendEmailNotification({
            subject: 'Hello', 
            body: `Hello, Please click <a href=${link}>here</a> to verify your account<br>
            
            Please change your password after you login.<br>
            password: ${password}`, 
            // body: link,
            to: body.email});

        await TokenModel.create({user_id: result._id, token});

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
        
    },

}