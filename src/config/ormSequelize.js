const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(dotenv.parsed.DB_DATABASE, dotenv.parsed.DB_USER, dotenv.parsed.DB_PASSWORD, {
    host: dotenv.parsed.DB_HOST,
    port: dotenv.parsed.DB_PORT,
    dialect: 'mysql'
});

const OrmConnetion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
}
module.exports = OrmConnetion;