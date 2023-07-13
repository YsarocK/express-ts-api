import { UUID } from 'crypto';
import { Model } from 'sequelize';

export namespace UserTypes {
  export interface Props extends Model {
    id: UUID;
    email: string;
    firstname: string;
    lastname: string;
  }

  export namespace Controller {
    export interface MagicLink {
      eleve: {
        nom: string;
        prenom: string;
        email: string;
      };
      ssh: {
        host: string;
        username: string;
      };
    }
  }
}
