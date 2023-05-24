import { DataTypes } from "sequelize";
import { conn } from "../db/connection";
import { Ticket } from "./Ticket";

const Sale = conn.define('sale',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

Sale.hasMany(Ticket);
export { Sale };