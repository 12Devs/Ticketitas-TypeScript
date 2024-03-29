import { DataTypes } from "sequelize";
import { conn } from "../db/connection";
import { Sale } from "./Sale";

const Event = conn.define('event', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT('long'),
        allowNull: false 
    },
    dataEvento: {
        type: DataTypes.DATE(),
        allowNull: false 
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    quantPista: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    quantStage: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    quantVip: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    valorPista: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    valorStage: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    valorVip: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    imageEvent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    porcentagemMeia: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 40.00
    },
    porcentagemGratis: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    }
});

Event.hasMany(Sale);
export { Event };