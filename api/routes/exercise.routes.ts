import express from 'express';
import { verifyExercise } from 'controllers';
import { Auth } from 'middlewares';

export const exerciseRouter = express.Router();

exerciseRouter.route('/verify').post(Auth, verifyExercise);
