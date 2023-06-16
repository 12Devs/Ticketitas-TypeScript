
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import {DB_HOST as dbhost, DB_USER as dbuser, DB_NAME as dbname, DB_PASSWORD as dbpassword, DB_DIALECT as dbdialect} from '../config/env';

dotenv.config();

// const dbName = process.env.DB_NAME as string;
// const dbUser = process.env.DB_USER as string;
// const dbPassword = process.env.DB_PASSWORD as string;
// const dbHost = process.env.DB_HOST as string;
// const dbPort: any = process.env.DB_PORT;


/**
 * Connection to DB
 * @date 6/15/2023 - 9:03:23 PM
 *
 * @type {*}
 */
const conn = new Sequelize(dbname, dbuser, dbpassword,{
    host: dbhost,
    dialect: dbdialect
});

// const conn = new Sequelize(dbName, dbUser, dbPassword, {
//     dialect: 'mysql',
//     port: dbPort,
//     host: dbHost,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       }
//   });

/**
 * Test connection to DB
*/
try {
    conn.authenticate();
    console.log("Conectado ao DB!")
} catch (error) {
    console.log("Não foi possível conectar ao DB: ", error);
}
export { conn };