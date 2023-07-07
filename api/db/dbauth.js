const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.MARIADB_DATABASE, 
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD, 
  {
    host: process.env.MARIADB_HOST,
    dialect: 'mariadb',
    port: 3306,
    logging: false
  }
);

module.exports = sequelize