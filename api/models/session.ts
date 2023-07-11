import {DataTypes, Model} from 'sequelize';
import { sequelize } from 'databases';

export interface SessionInterface extends Model{
    id: string;
    name: string;
}

export const Session = sequelize.define('Session', {
    //.
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Session.sync()