const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./../database/models');

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${user}:${password}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(config.dbName, user, password, {
  dialect: 'postgres',
  port: 5432,
});

setupModels(sequelize);

module.exports = sequelize;
