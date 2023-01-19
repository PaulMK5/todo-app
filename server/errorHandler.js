// const { ValidationError } = require('yup');
const UserNotFoundError = require('./errors/UserNotFoundError');
const {
  Error: { ValidationError, CastError }
} = require('mongoose');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const RefreshTokenError = require('./errors/RefreshTokenError');
const AccessTokenError = require('./errors/AccessTokenError');
const TaskNotFoundError = require('./errors/TaskNotFoundError');
const InvalidCredentialsError = require('./errors/InvalidCredentialsError');

module.exports.errorHandler = async (err, req, res, next) => {
  if (err instanceof InvalidCredentialsError) {
    return res.status(403).send({ error: err.message });
  }

  if (err instanceof TaskNotFoundError) {
    return res.status(403).send({ error: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).send({ error: err.message });
  }
  if (err instanceof UserNotFoundError) {
    return res
      .status(404)
      .set({
        'Access-Control-Expose-Headers': 'error',
        error: 'userNotFound'
      })
      .send({ error: err.message });
  }
  if (err instanceof AccessTokenError) {
    return res
      .status(403)
      .set({
        'Access-Control-Expose-Headers': 'error',
        error: 'access token expired'
      })
      .send({
        err: err.message,
        expiredAt: err.expiredAt
      });
  }

  if (err instanceof RefreshTokenError) {
    return res
      .status(401)
      .set({
        'Access-Control-Expose-Headers': 'error',
        error: 'refresh token expired or not found in db'
      })
      .send({ error: err.message });
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
    return res.status(400).send({ error: err.message });
  }
};
