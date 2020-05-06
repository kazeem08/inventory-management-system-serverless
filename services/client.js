const ClientModel = require('../models/client');

module.exports = {
    async getClients(params){
        const result = await ClientModel.find();
        console.log('RESULT',  result);
        // return ['kazeem'];
        return result;
    },

    async createClient(params){
        const result = await ClientModel.create(params);
        console.log('RESULT',  result);
        // return ['kazeem'];
        return result;
    }
}