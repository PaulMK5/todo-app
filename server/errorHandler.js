// const { ValidationError } = require('yup');
const UserError = require('./errors/UserError');

module.exports.errorHandler = async (err, req, res, next) => {
  /* if (err instanceof ValidationError) {
    return res.status(400).send(err.message);
  } */
  if (err instanceof UserError) {
    return res.status(400).send(err.message);
  } else {
    return res.status(400).send(err.message);
  }
};
