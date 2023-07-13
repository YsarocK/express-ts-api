import express from 'express';
import { check, loginUsingMagicLink, sendUserMagicLink, refreshLoginTokens } from 'controllers';
import { Auth } from 'middlewares';

export const userRouter = express.Router();

userRouter.route('/login').get(loginUsingMagicLink);
userRouter.route('/refresh').get(refreshLoginTokens);
userRouter.route('/interdit').get(Auth, check);

userRouter.route('/:session_id/register').post(sendUserMagicLink);
