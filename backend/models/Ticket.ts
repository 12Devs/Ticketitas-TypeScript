import { DataTypes } from "sequelize";
import { conn } from "../db/connection";

const Ticket = conn.define('ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nameEvent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sector: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dateEvent:{
        type: DataTypes.DATE,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export { Ticket };