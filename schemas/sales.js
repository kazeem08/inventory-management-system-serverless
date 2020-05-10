/*eslint-disable*/
const Joi = require('@hapi/joi');

/**
 * You can use schemas to validate http request bodies, etc to make sure they are valid and conform to the required format.
 * You can check to make sure a required parameter is present and conforms to whatever format was intended.
 * You can read more on the schema validation library here https://hapi.dev/family/joi/?v=16.1.7
 */

//declare fields here
const name = Joi.string();
const quantity = Joi.number();
const type = Joi.string();
const tag = Joi.string();
const cost_price = Joi.number().min(1);
const sales_price = Joi.number().min(1);
const reorder_point = Joi.number().min(1);


module.exports = {
  addSalesSchema: Joi.object({
    name: name.required(),
    quantity: quantity.required(),
    type,
    sales_price: sales_price.required(),
    tag: tag.required(),
    reorder_point: reorder_point.required(),
    cost_price: cost_price.required(),

  }),

  // updateProductSchema: Joi.object({
  //   name,
  //   price
  // })
};