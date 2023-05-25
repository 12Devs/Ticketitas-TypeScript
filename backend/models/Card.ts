import { DataTypes } from "sequelize"
import { conn } from "../db/connection"

const Card = conn.define('card', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cardNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },
    holder:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cvv: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { Card }