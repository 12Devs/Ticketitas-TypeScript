import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Event } from "./Event";

const EnderecoEvent = conn.define('enderecoEvent', {

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

EnderecoEvent.hasMany(Event);

export { EnderecoEvent };