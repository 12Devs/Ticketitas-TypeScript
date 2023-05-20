import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Ticket } from "./Ticket";
import { Sale } from "./Sale";

const Order = conn.define('order',{
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export { Order };