import { DataTypes } from 'sequelize';
import { sequelize } from 'databases';
import { User } from './user';
import { Session } from './session';

export const UserSession = sequelize.define('UserSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nb_try: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

UserSession.belongsTo(User);
UserSession.belongsTo(Session);

User.hasMany(UserSession);
Session.hasMany(UserSession);

UserSession.sync();
