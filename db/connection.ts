import { Sequelize } from 'sequelize';

const conn = new Sequelize('ticketitasdb', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

try {
    conn.authenticate();
    console.log("Conectado ao DB!")
} catch (error) {
    console.log("Não foi possível conectar ao DB: ", error);
}
export { conn };