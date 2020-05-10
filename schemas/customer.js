/*eslint-disable*/
const Joi = require('@hapi/joi');


//declare fields here
const title = Joi.string();
const first_name = Joi.string();
const middle_name = Joi.string();
const last_name = Joi.string();
const company_name = Joi.string();
const email = Joi.string().email();
const phone_numbers = Joi.array();
const billing_address = Joi.string();
const shipping_address = Joi.string();

module.exports = {
  createCustomerSchema: Joi.object({
    title: title.required(),
    first_name: first_name.required(),
    middle_name,
    last_name: last_name.required(),
    company_name,
    email: email.required(),
    phone_numbers: phone_numbers.required(),
    billing_address: billing_address.required(),
    shipping_address: shipping_address.required(),

  }),

  // updateProductSchema: Joi.object({
  //   name,
  //   price
  // })
};