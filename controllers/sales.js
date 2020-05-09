const SalesService = require('../services/sales');

module.exports = {

    async addSales(req, res){
        try{
            const sales = await SalesService.createSales(req.body);
            console.log(sales);
            return res.successResponse({
                message: 'Sales adde Successfully',
                data: sales,
              });
        } catch(e){
            console.log(e);
        }
    },

    async getAllClients(req, res){
        try{
            console.log('I AM HERRE');
            const clients = await ClientService.getClients(req.params);
            console.log(clients);
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