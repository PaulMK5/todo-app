const bcrypt = require('bcrypt');
const { SALT } = require('../configs/constants');

module.exports.hashPass = async (req, res, next) => {
  try {
    console.log('in hash middleware');
    const {
      body: { password }
    } = req;
    req.passwordHash = await bcrypt.hash(password, SALT);
    delete req.body.password;
    console.log(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
