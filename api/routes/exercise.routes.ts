import express from 'express';
import { verifyExercise } from 'controllers/exercise.controller';

export const exerciseRouter = express.Router();

exerciseRouter.route('/verify').post(verifyExercise);
