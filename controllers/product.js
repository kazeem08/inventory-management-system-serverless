const ProductService = require('../services/product');

module.exports = {
    async addProduct(req, res) {
        try {

            const product = await ProductService.createProduct(req.body);
            console.log(product);
            return res.successResponse({
                message: 'Product succesfully added',
                data: product,
                total: 0,
            });
        } catch (e) {
            console.log(e);
        }

    },

    async getAllProducts(req, res) {
        try {

            const product = await ProductService.getAll();
            return res.successResponse({
                message: (product.length < 1) ? 'No product available' : 'Successful',
                data: product,
                total: 0,
            })
        } catch (e) {
            console.log(e);
        }

    },
}