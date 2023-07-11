import {DataTypes, Model} from 'sequelize';
import { sequelize } from 'databases';
import { User } from './user'
import { Session } from './session'

export interface UserSessionInterface extends Model{
    id: string;
    note: number;
    nb_try: number;
    ssh_ip: string;
    ssh_user: string;
}

export const UserSession = sequelize.define('UserSession', {
    //.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nb_try: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ssh_ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ssh_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.belongsToMany(Session, { through: UserSession });
Session.belongsToMany(User, { through: UserSession });

UserSession.sync()