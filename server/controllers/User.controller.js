const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../models');
const { createTokenPair } = require('../services/tokenServices');
const RefreshTokenError = require('../errors/RefreshTokenError');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;
    const user = await User.create({ ...body, passwordHash });
    const tokens = await createTokenPair(user.id, user.email);
    await RefreshToken.create({
      token: tokens.refreshToken,
      userId: user._id
    });
    res.status(201).send({ user: user, tokens: tokens });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const {
      body: { email },
      passwordHash
    } = req;

    const found = await User.findOne({
      email: email
    });
    if (!found) {
      throw new UserNotFoundError('user not found in loginUser');
    }

    const result = await bcrypt.compare(passwordHash, found.passwordHash);
    /*if (!result) {
          return res.status(403).send({ err: 'password incorrect' });
        } */
    const tokens = await createTokenPair(found.id, found.email);
    await RefreshToken.create({
      token: tokens.refreshToken,
      userId: found._id
    });
    const plainObj = found.toObject();
    delete plainObj.passwordHash;
    res.status(200).send({ user: plainObj, tokens: tokens });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { payload } = req;

    const found = await User.findOne({
      email: payload.email
    });

    if (!found) {
      throw new UserNotFoundError('user not found in getUser');
    }
    res.status(200).send({ user: found });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken }
    } = req;

    let payload;
    let refreshTokenFromDB;

    try {
      payload = await verifyRefreshToken(refreshToken);
      refreshTokenFromDB = await RefreshToken.findOne({
        token: refreshToken
      });
    } catch (error) {
      next(new RefreshTokenError(error));
    }

    const found = await User.findOne({
      email: payload.email,
      _id: refreshTokenFromDB.userId
    });

    if (!found) {
      next(new UserNotFoundError('user not found in refresh'));
    }

    const tokens = await createTokenPair(found.id, found.email);
    await refreshTokenFromDB.remove();
    await RefreshToken.create({
      token: tokens.refreshToken,
      userId: found._id
    });
    res.status(201).send({ tokens });
  } catch (error) {
    next(error);
  }
};
