import { Sequelize } from 'sequelize';
import {DB_HOST as dbhost, DB_USER as dbuser, DB_NAME as dbname, DB_PASSWORD as dbpassword, DB_DIALECT as dbdialect} from '../config/env';

const conn = new Sequelize(dbname, dbuser, dbpassword,{
    host: dbhost,
    dialect: dbdialect
});

try {
    conn.authenticate();
    console.log("Conectado ao DB!")
} catch (error) {
    console.log("Não foi possível conectar ao DB: ", error);
}
export { conn };