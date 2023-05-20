import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const Ticket = conn.define('ticket', {
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