const dp = require('mysql2/promise');
const dotenv = require('dotenv').config();
const poolmysql = dp.createPool({
    host: dotenv.parsed.DB_HOST,
    port: dotenv.parsed.DB_PORT || 3306,
    user: dotenv.parsed.DB_USER,
    password: dotenv.parsed.DB_PASSWORD,
    database: dotenv.parsed.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

});
module.exports = poolmysql;
