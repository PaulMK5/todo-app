const { Router } = require('express');
const TaskController = require('../controllers/Task.controller');
const { checkAuth } = require('../middlewares/checkAuth');

const taskRouter = Router();

taskRouter.post('/', checkAuth, TaskController.createTask);
taskRouter.get('/', checkAuth, TaskController.getTasks);
taskRouter.delete('/', checkAuth, TaskController.deleteTask);

module.exports = taskRouter;
