module.exports = class AccessTokenError extends Error {
  constructor(error) {
    super('AccessTokenError: ' + error);
    this.expiredAt = error.expiredAt;
  }
};
