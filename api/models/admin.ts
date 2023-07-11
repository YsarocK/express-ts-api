import {DataTypes, Model} from 'sequelize';
import { sequelize } from 'databases';

export interface AdminInterface extends Model{
    id: string;
    email: string;
    password: string;
}

export const Admin = sequelize.define('Admin', {
    //.
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Admin.sync()