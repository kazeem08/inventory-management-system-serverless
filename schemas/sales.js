/*eslint-disable*/
const Joi = require('@hapi/joi');

/**
 * You can use schemas to validate http request bodies, etc to make sure they are valid and conform to the required format.
 * You can check to make sure a required parameter is present and conforms to whatever format was intended.
 * You can read more on the schema validation library here https://hapi.dev/family/joi/?v=16.1.7
 */

//declare fields here
const customer_id = Joi.string();
const invoice_date = Joi.date();
const due_date = Joi.date();
const type = Joi.string();
const products = Joi.array();


module.exports = {
  addSalesSchema: Joi.object({
    customer_id: customer_id.required(),
    invoice_date: invoice_date.required(),
    type: type.required(),
    due_date: due_date,
    products: products.required(),

  }),

  // updateProductSchema: Joi.object({
  //   name,
  //   price
  // })
};