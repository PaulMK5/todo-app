const { Task } = require('../models');
const TaskNotFoundError = require('../errors/TaskNotFoundError');

module.exports.getTasks = async (req, res, next) => {
  try {
    const {
      payload: { userId }
    } = req;
    const userTasks = await Task.find({
      authorId: userId
    });
    return res.status(200).send({ tasks: userTasks });
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
    res.status(201).send({ task: task });
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

    const task = await Task.findOneAndRemove({ authorId: userId, _id: taskId });
    if (!task) {
      throw new TaskNotFoundError('task not found in deleteTask');
    }
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
