import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const dbName = process.env.DB_NAME as string;
// const dbUser = process.env.DB_USER as string;
// const dbPassword = process.env.DB_PASSWORD as string;
// const dbHost = process.env.DB_HOST as string;
// const dbPort: any = process.env.DB_PORT;

const conn = new Sequelize('ticketitasdb', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
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

try {
    conn.authenticate();
    console.log("Conectado ao DB!")
} catch (error) {
    console.log("Não foi possível conectar ao DB: ", error);
}
export { conn };