import { Request, Response } from 'express';
import { verifyExerciseService } from 'services/exercise.service';
import { UserSessionService } from '../services/userSession.service';
import { ExerciseTypes } from 'types';

export const verifyExercise = async (req: Request, res: Response) => {
  const { host, username }: ExerciseTypes.Controller.Verify = req.body;

  const exercises = await verifyExerciseService({ host, username });

  if (!exercises.length) {
    await UserSessionService.updateUserSession(
      res.locals.userId,
      exercises.filter((el) => el.passed).reduce((acc, objet) => acc + objet.points, 0),
    );
    return res.status(400).json({ success: false, message: 'Cannot connect to host' });
  }

  await UserSessionService.updateUserSession(
    res.locals.userId,
    exercises.filter((el) => el.passed).reduce((acc, objet) => acc + objet.points, 0),
  );

  return res.status(200).json({
    success: true,
    data: {
      score: exercises.filter((el) => el.passed).reduce((acc, objet) => acc + objet.points, 0),
      tests: exercises,
    },
  });
};
