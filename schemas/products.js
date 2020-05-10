/*eslint-disable*/
const Joi = require('@hapi/joi');

/**
 * You can use schemas to validate http request bodies, etc to make sure they are valid and conform to the required format.
 * You can check to make sure a required parameter is present and conforms to whatever format was intended.
 * You can read more on the schema validation library here https://hapi.dev/family/joi/?v=16.1.7
 */

//declare fields here
const name = Joi.string();
const quantity = Joi.number().min(1);
const type = Joi.string();
const company_name = Joi.string();
const sales_price = Joi.number().min(1);
const tag = Joi.string();
const reorder_point = Joi.number();
const cost_price = Joi.number().min(1);

module.exports = {
  createProductSchema: Joi.object({
    name: name.required(),
    quantity: quantity.required(),
    type,
    sales_price: sales_price.required(),
    cost_price: cost_price.required(),
    company_name,
    tag,
    reorder_point: reorder_point.required(),

  }),

  // updateProductSchema: Joi.object({
  //   name,
  //   price
  // })
};