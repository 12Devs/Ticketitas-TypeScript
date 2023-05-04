import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const Client = conn.define('client',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { Client };

