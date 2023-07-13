import { ExerciseTypes } from 'types';
import { NodeSSH } from 'node-ssh';

/**
  Vérifie si un dossier utilisateur existe via une session SSH.
  @param session - La session SSH utilisée pour la connexion.
  @returns Une promesse résolue avec un objet de type ExerciseTypes indiquant si le dossier existe.
 */
export const userFolderExist = async (
  session: NodeSSH,
  ssh: { host: string; username: string },
): Promise<ExerciseTypes.Result> => {
  const FOLDER_TO_FIND = ssh.username;

  const META: ExerciseTypes.Meta = {
    slug: 'user-folder-exist',
    title: 'Dossier utilisateur',
    description: `Un utilisateur "${FOLDER_TO_FIND}" doit exister.`,
    help: `Ajoutez un utilisateur 'chucknorris' avec la clé SSH suivante : ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCcTTvFXZQCGwiE+xddnFO/UeDUzILO+BhMoESYrzKjFoXwzBX6qszlHZw3T/68OujhLg/k2c7oEy3YbdC2ftP2jFDVkMW/sfEy3i+m9AJzjTxxg1AyPpFx97VIb30/im8p83uvj0/Gn45VoPceCNiWt7C72vPZBhA01iYFBm744xZgA+Hi8tkzwAVStOsapMOqrBnxxn92zu5w8SFUyV4XYr39yBXghaYE8NXsX4s7glo+gFnSX5Sz3esIzyo9B81cjBOfPPzeg47MS+96EZURLcg0OjEZQJKwZFx9ZgXxpPyYFPCHoHpnxBgX54NDwsPGkhOF9tIaM+vZZleIb29IpBCo2aIJE1sBJvdV8fSLXraGK/5B6CmffTazFNr/Z44PUO0S08B4Z98jx/XW5X+wW8mSjMI7KOWo4RHCRanPSLVS/hV4mXBM5RrFtPF3px1n/8nzUoixtnR45aZdYZO97ULByQZUt+WW3rX0/2C3hSMuIhsm2Lj2graohCz4HdE= etienne@MacBook-Pro-de-Etienne.local`,
    points: 1,
  };

  const response: ExerciseTypes.Result = {
    ...META,
    passed: false,
  };

  try {
    const command = await session.execCommand(`cd /home && ls`);
    if (command.stdout.includes(`${FOLDER_TO_FIND}`)) {
      response.passed = true;
    } else {
      throw new SyntaxError(`L'utilisateur '${FOLDER_TO_FIND}' n'existe pas.`);
    }
  } catch (err: any) {
    response.error = err.message;
  }

  return response;
};
