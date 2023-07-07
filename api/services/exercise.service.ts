import { ExerciseTypes } from 'types';
import { connectToHost, session, userFolderExist } from 'utils';

const TESTS_STEPS = [userFolderExist, connectToHost];

export const verifyExerciseService = async ({ id, host, username }: ExerciseTypes.Verify.Props) => {
  const results = await session(host, username)
    .then((el) => {
      return TESTS_STEPS.map(async (test) => {
        return await test(el);
      });
    })
    .catch((err) => {
      return [];
    });

  return await Promise.all(results);
};
