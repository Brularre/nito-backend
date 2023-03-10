const joi = require('joi');

const reviewValidation = joi.object({
  text: joi.string().min(10).max(500).required(),
  rating: joi.number().required(),
});

module.exports = reviewValidation;
