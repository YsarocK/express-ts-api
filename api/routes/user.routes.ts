import express from 'express';
import { check, loginUsingMagicLink, sendUserMagicLink, refreshLoginTokens } from 'controllers/user.controller';
import { Auth } from 'middlewares/auth.middleware';

export const userRouter = express.Router();

userRouter.route('/:session_id/magic').post(sendUserMagicLink);
userRouter.route('/login').get(loginUsingMagicLink);
userRouter.route('/refresh').get(refreshLoginTokens);
userRouter.route('/interdit').get(Auth, check);