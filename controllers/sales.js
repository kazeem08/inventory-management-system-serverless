const _ = require('lodash');
const SalesService = require('../services/sales');
const { addSalesSchema } = require('../schemas/sales');

module.exports = {

    async addSales(req, res){
        await addSalesSchema.validateAsync(req.body);
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

    async getAllSales(req, res){
        try{
            const { _id } = req.user;
            const sales = await SalesService.getSales(_id);

            return res.successResponse({
                message: (sales.length < 1) ? 'No sales available' : 'Successful',
                data: sales,
                total: sales.length,
              });
        } catch(e){
            console.log(e);
        }
       
    },

    async getSalesById(req, res){
        try{
            const sales = await SalesService.findSalesById(req.params.id);

            return res.successResponse({
                message: (sales.length < 1) ? 'No sales available' : 'Successful',
                data: sales,
                total: sales.length,
              });
        } catch(e){
            console.log(e);
        }
       
    },

    async makePayment(req, res){
        try{
            const sales = await SalesService.makePayment(req.body);

            return res.successResponse({
                message: (sales.length < 1) ? 'No sales available' : 'Successful',
                data: sales,
                total: sales.length,
              });
        } catch(e){
            console.log(e);
        }
       
    }
}