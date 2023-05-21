import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Ticket } from "./Ticket";

const Sale = conn.define('sale',{
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

Sale.hasMany(Ticket);
export { Sale };