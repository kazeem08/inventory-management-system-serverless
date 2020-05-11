const ClientService = require('../services/client');

module.exports = {

    async createClient(req, res){
        try{
            const clients = await ClientService.createClient(req.body);
            return res.successResponse({
                message: 'Client Successfully created',
                data: clients,
              });
        } catch(e){
            console.log(e);
        }
    },

    async getAllClients(req, res){
        try{

            const clients = await ClientService.getClients(req.params);
            // console.log(clients);
            return res.successResponse({
                message: (clients.length < 1) ? 'No user available' : 'Successful',
                data: clients,
                total: 0,
              });
        } catch(e){
            console.log(e);
        }
       
    }
}