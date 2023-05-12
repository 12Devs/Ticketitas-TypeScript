import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Client } from "./Client";
import { Administrator } from "./Administrator";

const Endereco = conn.define('endereco', {
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Endereco.hasMany(Client);
Endereco.hasMany(Administrator);

export { Endereco };