const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const { hashPass } = require('../middlewares/hashPassword');

const userRouter = Router();

userRouter.post('/sign-up', hashPass, UserController.registerUser);
userRouter.post('/sign-in', hashPass, UserController.loginUser);
// userRouter.get('/', UserController.findAll);
// userRouter.put('/:userId', UserController.updateOne);
// userRouter.get('/:userId', UserController.findOne);
// userRouter.delete('/:userId', UserController.deleteOne);

module.exports = userRouter;
