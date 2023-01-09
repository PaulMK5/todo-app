const { Router } = require('express');
const TaskController = require('../controllers/Task.controller');

const taskRouter = Router();

taskRouter.post('/', TaskController.createTask);
taskRouter.get('/:userId', TaskController.getTasks);
// taskRouter.get('/', TaskController.findAll);
// taskRouter.put('/:userId', TaskController.updateOne);
// taskRouter.get('/:userId', TaskController.findOne);
// taskRouter.delete('/:userId', TaskController.deleteOne);

module.exports = taskRouter;
