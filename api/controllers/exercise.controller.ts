import { Request, Response } from 'express';
import { verifyExerciseService } from 'services/exercise.service';

export const verifyExercise = async (req: Request, res: Response) => {
  const { host, username } = req.body;

  const exercises = await verifyExerciseService({ host, username });

  if (!exercises.length) {
    return res.status(400).json({ success: false, message: 'Cannot connect to host' });
  }

  return res.status(200).json({
    success: true,
    data: {
      score: exercises.filter((el) => el.passed).length,
      tests: exercises,
    },
  });
};
