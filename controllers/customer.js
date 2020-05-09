const CustomerService = require('../services/customer');

module.exports = {
    async createCustomer(req, res) {
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
}