# Rédaction des tests

- Créer un fichier dans le dossier `exercises` avec le nom souhaité.
- Importer le fichier dans `routes/ExercicesController.js` avec un nom lié au fichier.
  - Ex : `import connectToHost from '../exercises/connect-to-host'`;
- Ajouter le test dans la liste des tests (`TESTS_STEPS`)
- Copier le template suivant dans le fichier créé :
  ```js
  import { ExerciceResultType } from "../types/ExerciceResultType";
  import { NodeSSH } from "node-ssh";

  export default async function(session: NodeSSH): Promise<ExerciceResultType> {
    const response: ExerciceResultType = {
      name: 'connect-to-host',
      passed: false,
    }

    try {
      // All tests steps (commands to execute, verification... etc... should be here)
    } catch (err: any) {
      response.error = err.message
    }

    return response
  }
  ```
- Ecrire son test (voir la doc de [node-ssh](https://www.npmjs.com/package/node-ssh))
- La gestion d'erreur se fait en renvoyer une `syntaxError()` avec le message d'erreur.

---

[Sami Lafrance](https://www.samilafrance.com/) | [Paul Cotogno](https://paulcotogno.com/) | [Etienne Moureton](https://www.etiennemoureton.fr/) | [Pierre Keller](https://pierrekeller.com/)
