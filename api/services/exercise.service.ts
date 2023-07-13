import { ExerciseTypes } from 'types';
import { session } from 'utils';
import { userFolderExist, checkNodeDirectory } from 'utils/exercises';
import {alias} from "../utils/exercises/alias";

const TESTS_STEPS = [userFolderExist, checkNodeDirectory, alias];

export const verifyExerciseService = async ({ host, username }: ExerciseTypes.Verify.Props) => {
  const results: Array<ExerciseTypes.Result>  = await session(host, username)
    .then(async (el) => {
      const map: Array<ExerciseTypes.Result> = new Array()
      for(let i = 0; i < TESTS_STEPS.length; i++) {
        const res = await TESTS_STEPS[i](el, { host, username });
        map.push(res)
        if(!res.passed) {
          break
        }
      }
      return map
    })
    .catch((err) => {
      return [{
        slug: 'connect-to-host',
        title: `Connexion à l'hôte`,
        description: `Il doit être possible de se connecter à l'hôte distant. Pour cela, il faut ajouter la clé SSH de l'hôte distant à la liste des clés connues.`,
        help: `Vérifiez que vous avez bien ajouté la clé SSH de l'hôte distant à la liste des clés connues de l'utilisateur "chucknorris".`,
        points: 1,
        passed: false
      }]
    });

  return await Promise.all(results);
};
