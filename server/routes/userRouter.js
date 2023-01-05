const { Router } = require('express');
const UserController = require('../controllers/User.controller');

const userRouter = Router();

userRouter.post('/registration', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
// userRouter.get('/', UserController.findAll);
// userRouter.put('/:userId', UserController.updateOne);
// userRouter.get('/:userId', UserController.findOne);
// userRouter.delete('/:userId', UserController.deleteOne);

module.exports = userRouter;
