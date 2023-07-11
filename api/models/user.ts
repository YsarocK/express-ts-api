import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'databases';
import { UUID } from 'crypto';

export interface UserInterface extends Model {
    id: UUID,
    email: string,
    firstname: string,
    lastname: string,
}

export const User = sequelize.define('User', {
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
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync()