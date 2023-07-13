import { Model } from 'sequelize';

export namespace AdminTypes {
  export interface Props extends Model {
    id: string;
    email: string;
    password: string;
  }

  export namespace Controller {
    export interface Create {
      name: string;
    }

    export interface Update {
      id: string;
      isActive: boolean;
    }

    export interface GetAllUsers {
      session_id: string;
    }

    export interface Login {
      email: string;
      password: string;
    }
  }
}
