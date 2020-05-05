/*eslint-disable*/
const Joi = require('@hapi/joi');

/**
 * You can use schemas to validate http request bodies, etc to make sure they are valid and conform to the required format.
 * You can check to make sure a required parameter is present and conforms to whatever format was intended.
 * You can read more on the schema validation library here https://hapi.dev/family/joi/?v=16.1.7
 */

//declare fields here
const name = Joi.string();
const price = Joi.number().min(1000).max(10000);

module.exports = {
  createProductSchema: Joi.object({
    name: name.required(),
    test_field2: name,
    price: price.required()
  }),

  updateProductSchema: Joi.object({
    name,
    price
  })
};