import { Model } from 'sequelize';

export namespace SessionTypes {
  export interface Props extends Model {
    id: string;
    name: string;
    isActive: boolean;
  }
}
