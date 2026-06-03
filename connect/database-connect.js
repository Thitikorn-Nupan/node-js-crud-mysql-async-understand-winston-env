const dotenv = require('dotenv')  // good module
const path = require('path')
const logger = require('../log/logging')

// if you use __filename , it will start on this file
dotenv.config({path: path.join(__filename, '../../env/.env'), debug: true}) // remember name key shouldn't be like syntax of env file as USERNAME , ...

class DatabaseConnect {

    #infoDB = {
        user: process.env.SQL_USERNAME,
        host: process.env.SQL_HOST,
        database: process.env.SQL_DATABASE,
        password: process.env.SQL_PASSWORD,
        port: process.env.SQL_PORT,
        connectionLimit: 1,
    }

    #pool

    constructor() {
        this.#pool = require('pg').Pool
    }

    get pool() {
        const mysql = require('mysql2');
        return mysql.createPool({
            connectionLimit: this.#infoDB.connectionLimit,
            host: this.#infoDB.host,
            user: this.#infoDB.user,
            password: this.#infoDB.password,
            database: this.#infoDB.database
        })
    }
}

module.exports = new DatabaseConnect().pool

/**
 const connectDatabase = new ConnectDatabase();
 const pool = connectDatabase.pool
 pool.getConnection((err, connection) => {
 if (err) {
 logger.debug("connect with pooling failed : " + err.message)
 throw err
 }
 else logger.silly("connected")
 })
 */


