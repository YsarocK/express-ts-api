import express from 'express';
import { sendUserMagicLink } from 'controllers/user.controller';

export const userRouter = express.Router();

userRouter.route('/:session_id/magic').post(sendUserMagicLink);
