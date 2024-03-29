import { DataTypes } from "sequelize";
import { conn } from "../db/connection";
import { Event } from "./Event";

const EnderecoEvent = conn.define('enderecoEvent', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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
        allowNull: true
    }
});

EnderecoEvent.hasMany(Event);

export { EnderecoEvent };