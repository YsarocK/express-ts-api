import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../databases/databaseAuth';
import { User } from './user'
import { Session } from './session'

export const UserSession = sequelize.define('UserSession', {
    //.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nb_try: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

User.belongsToMany(Session, { through: UserSession });
Session.belongsToMany(User, { through: UserSession });

UserSession.sync()