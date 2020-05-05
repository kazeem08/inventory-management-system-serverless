/* eslint-disable */
const mockResponse = require('./mocks/res');
const ProductController = require('../controllers/products');

jest.mock('../services/product');
jest.mock('../lib/aws_sqs');

const sampleProduct = {
  name: 'Test Product',
  price: 1000,
};

const sampleProducts = [
  {
    name: 'iPhone 11',
    price: 2800
  },
  {
    name: 'iPhone 11 Pro',
    price: 4000
  }
];
describe('Product Controller', () => {
  const res = mockResponse;

  afterEach(() => {
    res.successResponse.mockReset();
  });

  test('it should create a new product', async () => {
    const req = {
      body: sampleProduct,
      headers: {
        'x-forwarded-for': "localhost"
      }
    };


    await ProductController.addProduct(req, res);

    expect(res.successResponse).toBeCalledWith({
      message: 'Product Successfully Created',
      data: sampleProduct,
    });
  });

  test('it should insert many products', async () => {
    const req = {
      body: sampleProducts,
      headers: {
        'x-forwarded-for': "localhost"
      }
    };

    await ProductController.insertManyProducts(req, res);

    expect(res.successResponse).toBeCalledWith({
      message: 'Products Successfully Created'
    });

  });

  test('it should return all products', async () => {
    const req = {
      headers: {
        'x-forwarded-for': "localhost"
      }
    };

    await ProductController.getAllProducts(req, res);

    const expectedProducts = [sampleProduct, ...sampleProducts];

    expect(res.successResponse).toBeCalledWith({
      message: 'Products Fetched Successfully',
      data: expectedProducts,
      headers: {
        "x-total-count": expectedProducts.length
      }
    });

  });

  test('it should return a product', async() => {
    const req = {
      headers: {
        'x-forwarded-for': "localhost"
      },
      params:{
        id: '22'
      }
    };

    await ProductController.getProduct(req, res);

    expect(res.successResponse).toBeCalledWith({
      message: 'Product Fetched Successfully',
      data: {
        name: 'Test Product',
        price: 1000,
      }
    });

  })
});




async function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}
