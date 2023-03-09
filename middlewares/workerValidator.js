const joi = require('joi');

const workerValidation = joi.object({
  name: joi.string().min(2).max(40).required(),
  area: joi.string().required(),
  city: joi.string().required(),
  email: joi.string().email(),
  link: joi.string(),
  telephone: joi.string(),
  location: joi.array().items(joi.string()),
  creator: joi.string(),
  reviews: joi.array().items(joi.string()),
  ratings: joi.array().items(joi.string()),
  createdAt: joi.date().iso(),
});

module.exports = workerValidation;
