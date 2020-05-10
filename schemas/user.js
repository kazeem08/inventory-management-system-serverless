/*eslint-disable*/
const Joi = require('@hapi/joi');


//declare fields here
const title = Joi.string();
const first_name = Joi.string();
const middle_name = Joi.string();
const last_name = Joi.string();
const password = Joi.string();
const date_of_birth = Joi.date();
const email = Joi.string().email();
const phone_numbers = Joi.array();
const gender = Joi.string();
const address = Joi.string();
const role = Joi.string();
const write = Joi.boolean();


module.exports = {
  createUserSchema: Joi.object({
    title: title.required(),
    first_name: first_name.required(),
    password: password.required(),
    middle_name,
    last_name: last_name.required(),
    date_of_birth:  date_of_birth.required(),
    email: email.required(),
    phone_numbers: phone_numbers.required(),
    gender: gender.required(),
    address: address.required(),
    role: role.required(),
    write: write.required(),

  }),

  loginUserSchema: Joi.object({
    email: email.required(),
    password: password.required(),
  })
};