import express from 'express';
import { verifyExercise } from 'controllers/exercise.controller';
import { Auth } from 'middlewares/auth.middleware';

export const exerciseRouter = express.Router();

exerciseRouter.route('/verify').post(Auth, verifyExercise);
