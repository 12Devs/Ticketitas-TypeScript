import { DataTypes } from "sequelize";
import { conn } from "../db/connection";

const Ticket = conn.define('ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    }
});

export { Ticket };