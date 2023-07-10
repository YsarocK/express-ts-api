import { DataTypes } from 'sequelize';
import { sequelize } from 'databases';

export const Session = sequelize.define('Session', {
    //.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Session.sync()