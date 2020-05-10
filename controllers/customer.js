const CustomerService = require('../services/customer');
const { createCustomerSchema } = require('../schemas/customer');

module.exports = {
    async createCustomer(req, res) {
        await createCustomerSchema.validateAsync(req.body);

        try {
            const { _id } = req.user;
            const customer = await CustomerService.addCustomer(req.body, _id);
            console.log(customer);
            return res.successResponse({
                message: 'Customer succesfully added',
                data: customer,
            });
        } catch (e) {
            console.log(e);
        }
    },

    async getAllCustomers(req, res) {
        try {
            const { _id } = req.user;
            const product = await CustomerService.getCustomers(_id);
            return res.successResponse({
                message: (product.length < 1) ? 'No product available' : 'Successful',
                data: product,
                total: 0,
            })
        } catch (e) {
            console.log(e);
        }
    },

    async getProductById(req, res) {
        try {
            const product = await ProductService.findProductById(req.params.id);
            
            if (!product) {
                return res.errorResponse({
                    message: `Product not found`,
                    statusCode: 404
                })
            }
            return res.successResponse({
                message: 'User fetched succesfully',
                data: product,
            });
        } catch (e) {
            console.log(e);
            return res.successResponse({
                message: 'Internal server error',
            });
        }
    },

    async getCustomerSales(req, res) {
        try {
            const { _id } = req.user;
            const {customer_id} = req.query;
            const sales = await CustomerService.findCustomerSales(customer_id);
            return res.successResponse({
                message: (sales.length < 1) ? 'No sales available' : 'Successful',
                data: sales,
            })
        } catch (e) {
            console.log(e);
        }
},

  
}