import { DataTypes } from "sequelize";
import { conn } from "../db/connection";
import { Ticket } from "./Ticket";
import { Sale } from "./Sale";

const Order = conn.define('order',{
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

export { Order };