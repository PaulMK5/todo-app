const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const { hashPass } = require('../middlewares/hashPassword');
const { checkAuth } = require('../middlewares/checkAuth');

const userRouter = Router();

userRouter.post('/sign-up', hashPass, UserController.registerUser);
userRouter.post('/sign-in', hashPass, UserController.loginUser);
userRouter.post('/refresh', UserController.refresh);
userRouter.get('/', checkAuth, UserController.getUser);
// userRouter.put('/:userId', UserController.updateOne);
// userRouter.delete('/:userId', UserController.deleteOne);

module.exports = userRouter;
