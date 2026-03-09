const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'cobalt_analytics',
  process.env.MYSQL_USER || 'cobalt-analytics',
  process.env.MYSQL_PASSWORD || 'cobaltanalytics',
  {
    host: process.env.MYSQL_HOST || 'localhost', 
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
