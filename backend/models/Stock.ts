import { DataTypes } from "sequelize";
import { conn } from "../db/connection";

const Stock = conn.define('stock',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantPista:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantStage:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantVip:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

export { Stock };