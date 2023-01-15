const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { EXPIRED_RT } = require('../configs/constants');
const { EXPIRED_AT } = require('../configs/constants');
const { RefreshToken } = require('../models');

const promJWTsign = promisify(jwt.sign);
const promJWTverify = promisify(jwt.verify);

const secret_AT = 'qwerty';
const secret_RT = 'qwerty123';

createRefreshToken = async (userId, email) => {
  const token = await promJWTsign({ userId, email }, secret_RT, {
    expiresIn: EXPIRED_RT
  });
  await RefreshToken.create({
    token,
    userId
  });
  return token;
};

createAccessToken = async (userId, email) =>
  await promJWTsign({ userId, email }, secret_AT, {
    expiresIn: EXPIRED_AT
  });

createTokenPair = async (userId, email) => {
  const accessToken = await createAccessToken(userId, email);
  const refreshToken = await createRefreshToken(userId, email);
  return { accessToken, refreshToken };
};

verifyAccessToken = async token => await promJWTverify(token, secret_AT);

verifyRefreshToken = async token => await promJWTverify(token, secret_RT);

module.exports = {
  createRefreshToken,
  createAccessToken,
  createTokenPair,
  verifyAccessToken,
  verifyRefreshToken
};
