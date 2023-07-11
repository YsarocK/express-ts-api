import { ExerciseTypes } from 'types';
import { NodeSSH } from 'node-ssh';

/**
 Vérifie la présence d'un dossier spécifié, sa taille et la présence d'un sous-dossier avec une taille spécifique via une session SSH.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciseTypes indiquant si les vérifications sont correctes.
 */
export const checkNodeDirectory = async (session: NodeSSH): Promise<ExerciseTypes.Result> => {
  const directoryPath = '/home/chucknorris/';
  const expectedDirectoryName = 'nodejs';
  const expectedDirectorySize = 88616;
  const expectedSubfileName = 'node.exe';
  const expectedSubdirectorySize = 67808;

  const META: ExerciseTypes.Meta = {
    slug: 'check-directory',
    title: `Récupération de l'archive de Node 18`,
    description: `Récupérez l'archive de Node.js v18.0.0 et décompressez-la à la racine de l'utilisateur "chucknorris".`,
    help: `Utilisez 'wget' et 'unzip'`,
    points: 5,
  };

  const response: ExerciseTypes.Result = {
    ...META,
    passed: false,
  };

  try {
    const [directoryExistCommand, directorySizeCommand, subdirectorySizeCommand, directoryListingCommand] = await Promise.all([
      session.execCommand(`ls ${directoryPath}`),
      session.execCommand(`du --max-depth=0 ${directoryPath}${expectedDirectoryName}`),
      session.execCommand(`du --max-depth=0 ${directoryPath}/${expectedDirectoryName}/${expectedSubfileName}`),
      session.execCommand(`ls ${directoryPath}${expectedDirectoryName}`),
    ]);

    const directoryExist = directoryExistCommand.stdout.trim().split('\n');
    const directorySize = parseInt(directorySizeCommand.stdout.trim().split('\t')[0], 10);
    const subdirectorySize = parseInt(subdirectorySizeCommand.stdout.trim().split('\t')[0], 10);
    const directoryListing = directoryListingCommand.stdout.trim().split('\n');

    if (
      directoryExist.includes(expectedDirectoryName) &&
      directorySize === expectedDirectorySize &&
      directoryListing.includes(expectedSubfileName) &&
      subdirectorySize === expectedSubdirectorySize
    ) {
      response.passed = true;
    } else {
      const errors = [];
      if (!directoryExist.includes(expectedDirectoryName)) {
        errors.push(`Le dossier "${expectedDirectoryName}" est manquant.`);
      }
      if (directorySize !== expectedDirectorySize) {
        errors.push(`La taille du dossier "${expectedDirectoryName}" ne correspond pas.`);
      }
      if (!directoryListing.includes(expectedSubfileName)) {
        errors.push(`Le fichier "${expectedSubfileName}" est manquant.`);
      }
      if (subdirectorySize !== expectedSubdirectorySize) {
        errors.push(`La taille du fichier "${expectedSubfileName}" ne correspond pas.`);
      }

      throw new Error(errors.join('\n'));
    }
  } catch (err: any) {
    response.error = err.message;
  }

  return response;
};
