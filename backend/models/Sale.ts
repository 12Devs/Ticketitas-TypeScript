import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const Sale = conn.define('sale',{
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export { Sale };