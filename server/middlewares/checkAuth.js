const { verifyAccessToken } = require('../services/tokenServices');
const AccessTokenError = require('../errors/AccessTokenError');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req;
    if (!authorization) {
      throw new AccessTokenError();
    }
    const [, token] = authorization.split(' ');
    let payload;
    try {
      payload = await verifyAccessToken(token);
    } catch (error) {
      console.log('accessToken error in checkAuth middleware', error);
      next(new AccessTokenError(error));
    }
    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
