require("dotenv").config();
const { createPool } = require("mysql");

let dbConfig;
if(process.env.STATUS ==="PROD"){
    dbConfig={
        port: process.env.DB_PORT,
        host: process.env.DB_HOST_PROD,
        user: process.env.DB_USER_PROD,
        password: process.env.DB_PASS_PROD,
        database: process.env.MYSQL_DB_PROD,
        connectionLimit: 10
    };
}else{
    dbConfig={
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.MYSQL_DB,
        connectionLimit: 10
    }
}

const pool = createPool(dbConfig);

module.exports = pool;