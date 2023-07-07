import { ExerciseTypes } from 'types';
import { NodeSSH } from 'node-ssh';

/**

 Effectue la connexion à un hôte distant via une session SSH.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciceResultType contenant le résultat de la connexion.
 */
export const connectToHost = async (session: NodeSSH): Promise<ExerciseTypes.Result> => {
  const response: ExerciseTypes.Result = {
    name: 'connect-to-host',
    passed: false,
  };

  try {
    // All tests steps (commands to execute, verification... etc... should be here)
    if (session.isConnected()) {
      response.passed = true;
    } else {
      throw new SyntaxError(`Cannot connect to host`);
    }
  } catch (err: any) {
    response.error = err.message;
  }

  return response;
};
