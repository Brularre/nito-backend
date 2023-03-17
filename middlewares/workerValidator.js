const joi = require('joi');

const workerValidation = joi.object({
  name: joi.string().min(2).max(40).required(),
  area: joi.string().required(),
  city: joi.string().required(),
  email: joi.string().email().optional().allow('No ingresado'),
  link: joi.string().optional().allow('No ingresado'),
  telephone: joi.string().optional().allow('No ingresado'),
  location: joi.array().items(joi.number()),
  creator: joi.string(),
  createdAt: joi.date().iso(),
});

module.exports = workerValidation;
