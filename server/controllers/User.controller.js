const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../models');
const {
  createTokenPair,
  verifyRefreshToken
} = require('../services/tokenServices');
const RefreshTokenError = require('../errors/RefreshTokenError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');
const { SALT_ROUNDS } = require('../configs/constants');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
    const user = await User.create({ ...body, passwordHash });
    const tokens = await createTokenPair(user.id, user.email);
    const userPOJO = user.toObject();
    delete userPOJO.passwordHash;
    res.status(201).send({ user: userPOJO, tokens: tokens });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const {
      body: { email, password }
    } = req;

    const found = await User.findOne({ email });
    let passCompareRes;
    if (found) {
      passCompareRes = await bcrypt.compare(password, found.passwordHash);
    }

    if (!passCompareRes || !found) {
      throw new InvalidCredentialsError('incorrect credentials');
    }

    const tokens = await createTokenPair(found.id, found.email);
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
    const userPOJO = found.toObject();
    delete userPOJO.passwordHash;
    res.status(200).send({ user: userPOJO });
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
      console.log('error refreshing token in User.controller.refresh');
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
    res.status(201).send({ tokens });
  } catch (error) {
    next(error);
  }
};
