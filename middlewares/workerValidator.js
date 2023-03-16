const joi = require('joi');

const workerValidation = joi.object({
  name: joi.string().min(2).max(40).required(),
  area: joi.string().required(),
  city: joi.string().required(),
  email: joi.string().email().allow('').optional(),
  link: joi.string().allow('').optional(),
  telephone: joi.string().allow('').optional(),
  location: joi.array().items(joi.string()),
  creator: joi.string(),
  createdAt: joi.date().iso(),
});

module.exports = workerValidation;
