module.exports = class RefreshTokenError extends Error {
  constructor(message) {
    super('RefreshTokenError: ' + message);
  }
};
