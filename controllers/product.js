const ProductService = require('../services/product');
const { createProductSchema } = require('../schemas/products');

module.exports = {
    async addProduct(req, res) {

        await createProductSchema.validateAsync(req.body);
        try {
            const { _id } = req.user;
            const product = await ProductService.createProduct(req.body, _id);
            console.log(product);
            return res.successResponse({
                message: 'Product succesfully added',
                data: product,
                total: 0,
            });
        } catch (e) {
            console.log(e);
            return res.errorResponse({
                message: 'error occured',
            });
        }
    },

    async getAllProducts(req, res) {
        try {
            const { _id } = req.user;
            const product = await ProductService.getAll(_id);
            return res.successResponse({
                message: (product.length < 1) ? 'No product available' : 'Successful',
                data: product,
                total: 0,
            });
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