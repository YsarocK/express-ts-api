import { Model } from 'sequelize';

export namespace UserSessionTypes {
  export interface Props extends Model {
    id: string;
    note: number;
    nb_try: number;
    ssh_ip: string;
    ssh_user: string;
  }
}
