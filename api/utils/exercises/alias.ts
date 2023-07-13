import { ExerciseTypes } from 'types';
import { NodeSSH } from 'node-ssh';

/**

 Vérifier si un alias pour echo Hello World a correctement été mit.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciseTypes indiquant si l'alias est bon.
 */
export const alias = async (session: NodeSSH, ssh: { host: string, username: string }): Promise<ExerciseTypes.Result> => {
    const FOLDER_TO_FIND = ssh.username;

    const META: ExerciseTypes.Meta = {
        slug: 'alis',
        title: 'Alias',
        description: `Afficher 'Hello World' dans la console en tapant bonjour.`,
        help: `Utilisez alias pour modifier une commande`,
        points: 2,
    };

    const response: ExerciseTypes.Result = {
        ...META,
        passed: false,
    }

    try {
        const command = await session.execCommand(`bonjour`);
        if (command.stdout.includes(`Hello World`)) {
            response.passed = true;
        } else {
            throw new SyntaxError(`Hello World n'a pas été trouvé`);
        }
    } catch (err: any) {
        response.error = err.message;
    }

    return response;
};
