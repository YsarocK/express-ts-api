import { ExerciseTypes } from 'types';
import { NodeSSH } from 'node-ssh';

/**

 Vérifie si un dossier utilisateur existe via une session SSH.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciseTypes indiquant si le dossier existe.
 */
export const userFolderExist = async (session: NodeSSH): Promise<ExerciseTypes.Result> => {
  const META: ExerciseTypes.Meta = {
    slug: 'user-folder-exist',
    title: 'Dossier utilisateur',
    description: `Un dossier nommé "snap" doit exister dans le dossier de l'utilisateur.`,
    points: 2,
  };

  const response: ExerciseTypes.Result = {
    ...META,
    passed: false,
  }

  try {
    const FOLDER_TO_FIND = 'snap';
    const command = await session.execCommand(`ls`);
    console.log(command.stdout)
    if (command.stdout.includes(`${FOLDER_TO_FIND}`)) {
      response.passed = true;
    } else {
      throw new SyntaxError(`${FOLDER_TO_FIND} folder not found`);
    }
  } catch (err: any) {
    response.error = err.message;
  }

  return response;
};
