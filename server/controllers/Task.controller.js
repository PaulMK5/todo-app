const { Task } = require('../models');

module.exports.getTasks = async (req, res, next) => {
  try {
    const {
      payload: { userId }
    } = req;
    const userTasks = await Task.find({
      authorId: userId
    });
    return res.status(200).send({ data: userTasks });
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      payload: { userId }
    } = req;
    const task = await Task.create({ ...body, authorId: userId });
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      body: { taskId },
      payload: { userId }
    } = req;
    await Task.findOneAndRemove({ authorId: userId, _id: taskId });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
