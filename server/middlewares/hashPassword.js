const bcrypt = require('bcrypt');
const { SALT } = require('../configs/constants');

module.exports.hashPass = async (req, res, next) => {
  try {
    const {
      body: { password }
    } = req;
    if (password) {
      req.passwordHash = await bcrypt.hash(password, SALT);
      delete req.body.password;
    }
    next();
  } catch (err) {
    next(err);
  }
};
