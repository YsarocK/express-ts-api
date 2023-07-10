import { DataTypes } from 'sequelize';
import { sequelize } from 'databases';

export const Admin = sequelize.define('Admin', {
    //.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
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