const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const promJWTsign = promisify(jwt.sign);
const promJWTverify = promisify(jwt.verify);

const secret = 'qwerty';
const EXPIRED = 10;

module.exports.createToken = async (userId, email) =>
  await promJWTsign({ userId, email }, secret, {
    expiresIn: EXPIRED
  });

module.exports.verifyToken = async token => await promJWTverify(token, secret);
