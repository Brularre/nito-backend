const joi = require('joi');

// Added rating range (.min(1).max(5)) — previously accepted any number.
// Note: text minlength aligned to 10 to match the model (model had 4, validator had 10;
// the validator is the source of truth for API contracts so model follows).
const reviewValidation = joi.object({
  text: joi.string().min(10).max(500).required(),
  rating: joi.number().min(1).max(5).required(),
});

module.exports = reviewValidation;
