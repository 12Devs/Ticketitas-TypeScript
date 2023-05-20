import { DataTypes } from "sequelize"
import { conn } from "../db/Connection"


const Card = conn.define('card', {
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