import { DataTypes } from "sequelize"
import { conn } from "../db/connection"

const Checkout = conn.define('checkout', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    pistaAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stageAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vipAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pistaAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stageAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vipAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    freeAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amountSale:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export { Checkout }