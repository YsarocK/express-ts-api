import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../databases/databaseAuth';

export const User = sequelize.define('User', {
    //.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    server_ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    server_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync()