class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = 400;
  }
}

module.exports = RequestError;
