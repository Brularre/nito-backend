// 422 Unprocessable Entity — data was received but failed validation rules.
// For auth failures (missing/invalid token) use UnauthorizedError instead.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 422;
  }
}

module.exports = ValidationError;
