import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/databaseAuth';

export const Admin = sequelize.define('Admin', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Admin.sync()