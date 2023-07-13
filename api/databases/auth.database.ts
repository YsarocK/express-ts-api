import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.MARIADB_DATABASE as string,
  process.env.MARIADB_USER as string,
  process.env.MARIADB_PASSWORD,
  {
    host: process.env.MARIADB_HOST,
    dialect: 'mariadb',
    port: process.env.MARIADB_PORT ? parseInt(process.env.MARIADB_PORT) : 3306,
    logging: false,
  },
);
