const joi = require('joi');

// Changes from original:
// - Removed `creator` and `createdAt` — these are set by the server, not the client.
//   Accepting them from the request body was a footgun (client could spoof creator).
// - Added area enum to the 6 known specialties instead of accepting any string.
// - Added URI validation for the `link` field when a real URL is provided.
// - Email and link still allow 'No ingresado' to preserve backward compatibility
//   with existing data that uses that sentinel value.

const VALID_AREAS = [
  'Automotriz',
  'Construcción',
  'Electricidad',
  'Limpieza',
  'Pintura',
  'Plomería',
];

const workerValidation = joi.object({
  name: joi.string().min(2).max(40).required(),
  area: joi.string().valid(...VALID_AREAS).required(),
  city: joi.string().required(),
  email: joi.string().email().optional().allow('No ingresado'),
  link: joi.string().uri().optional().allow('No ingresado'),
  telephone: joi.string().optional().allow('No ingresado'),
  location: joi.array().items(joi.number()),
});

module.exports = workerValidation;
