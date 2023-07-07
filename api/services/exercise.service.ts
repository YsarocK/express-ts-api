import { ExerciseTypes } from 'types';
import { session } from 'utils';
import { connectToHost, userFolderExist } from 'utils/exercises';

const TESTS_STEPS = [userFolderExist, connectToHost];

export const verifyExerciseService = async ({ host, username }: ExerciseTypes.Verify.Props) => {
  const results = await session(host, username)
    .then(async (el) => {
      const map = []
      for(let i = 0; i < TESTS_STEPS.length; i++) {
        const res = await TESTS_STEPS[i](el);
        map.push(res)
        if(!res.passed) {
          break
        }
      }
      return map
    })
    .catch((err) => {
      return [];
    });

  return await Promise.all(results);
};
