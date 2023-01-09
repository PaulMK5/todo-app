const { User } = require('../models');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);
    const user = await User.create(body);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    res.status(201).send(user);
  } catch (error) {
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
