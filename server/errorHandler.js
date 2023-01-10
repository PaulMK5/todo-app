// const { ValidationError } = require('yup');
const UserError = require('./errors/UserError');
const {
  Error: { ValidationError, CastError }
} = require('mongoose');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

module.exports.errorHandler = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ err: err.message });
  }
  if (err instanceof UserError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof TokenExpiredError) {
    return res.status(403).send({
      err: err.message,
      expiredAt: err.expiredAt
    });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(403).send(err);
  } else {
    return res.status(400).send(err.message);
  }
};
