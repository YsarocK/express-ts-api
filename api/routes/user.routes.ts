import express from 'express';
import { getUserMagicLink } from 'controllers/user.controller';

export const userRouter = express.Router();

userRouter.route('/:id/link').post(getUserMagicLink);
