const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const _ = require('lodash');
const validationUtil = require('../utils/validation');

const userSchema = Joi.object({
  firstName: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z]+$/)
      .message('Invalid first name'),
  lastName: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z]+$/)
      .message('Invalid last name'),
  phone: Joi.string()
      .pattern(/^\+?[0-9 ]+$/)
      .message('Invalid phone, use only number and space'),
  email: Joi.string().email(),
  password: Joi.string()
      .min(4),
  meta: Joi.object({
    description: Joi.string(),
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string()
      .min(4),
});

module.exports = {
  saveUser(req, res, next) {
    if (validationUtil.allValidation(req, res, userSchema, {presence: 'required'})) {
      next();
    }
  },
  loginUser(req, res, next) {
    if (validationUtil.allValidation(req, res, loginSchema, {presence: 'required'})) {
      next();
    }

  },
  updateUser(req, res, next) {
    if (validationUtil.allValidation(req, res, userSchema)) {
      next();
    }
  },
};
