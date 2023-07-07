import express from 'express';
import { verifyExercise } from 'controllers/exercise.controller';

export const exerciseRouter = express.Router();

exerciseRouter.route('/:id/verify').get(verifyExercise);
