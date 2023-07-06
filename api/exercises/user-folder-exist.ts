import { ExerciceResultType } from "../types/ExerciceResultType";
import { NodeSSH } from "node-ssh";

/**

 Vérifie si un dossier utilisateur existe via une session SSH.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciceResultType indiquant si le dossier existe.
 */
export default async function(session: NodeSSH): Promise<ExerciceResultType> {
  const response: ExerciceResultType = {
    name: 'user-folder-exist',
    passed: false,
  }

  try {
    // All tests steps (commands to execute, verification... etc... should be here)
    const FOLDER_TO_FIND = 'snap'
    const command = await session.execCommand(`ls`)
    if (command.stdout.includes(` ${FOLDER_TO_FIND} `)) {
      response.passed = true
    } else {
      throw new SyntaxError(`${FOLDER_TO_FIND} folder not found`)
    }
  } catch (err: any) {
    response.error = err.message
  }

  return response
}