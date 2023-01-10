const { createToken } = require('../services/tokenServices');

module.exports.createToken = async (req, res, next) => {
  try {
    const { body } = req;
    console.log('In body middleware!');
    console.log(body);
    const token = await createToken(found._id, found.email);

    createToken();
    // next();
  } catch (err) {
    next(err);
  }
};
