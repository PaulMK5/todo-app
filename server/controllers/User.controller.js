const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createToken, verifyToken } = require('../services/tokenServices');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;
    console.log(body);
    const user = await User.create({ ...body, passwordHash });
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    let found;

    //has token in request
    if (body.token) {
      const verified = await verifyToken(body.token);
      console.log('result of token verification: ', verified);
      found = await User.findById(verified.userId);

      if (found) {
        console.log('found user by id after verification:', found);
        const plainObj = found.toObject();
        delete plainObj.passwordHash;
        return res.status(200).send({ user: plainObj, authenticated: true });
      } else {
        return res.status(403).send();
      }
    }

    //doesn't have token in request
    if (body.email && !body.token) {
      found = await User.findOne({
        email: body.email
      });
      if (found) {
        console.log('found user: ', found);
        const result = await bcrypt.compare(passwordHash, found.passwordHash);
        // console.log('passwordHash', passwordHash);
        // console.log('found.passwordHash', found.passwordHash);
        // console.log(result);
        const token = await createToken(found._id, found.email);
        const plainObj = found.toObject();
        delete plainObj.passwordHash;
        // console.log(plainObj);
        res.status(200).send({ user: plainObj, token });
      }
    }
  } catch (error) {
    console.log('Error in User.controller.loginUser: ', error.message);
    next(error);
  }
};

/* module.exports.findOne = async (req, res, next) => {
  try {
    const {
      params: { userId }
    } = req;
    const user = await User.findById(userId).populate('comments');
    if (!user) {
      res.status(404);
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const result = await User.find().populate('comments');
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOne = async (req, res, next) => {
  try {
    const {
      params: { userId }
    } = req;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(400).send('There is no such user');
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateOne = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body
    } = req;
    const user = await User.findByIdAndUpdate(userId, body, {
      returnDocument: 'after'
    });
    if (!user) {
      res.status(404);
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
 */
