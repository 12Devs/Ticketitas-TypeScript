import { DataTypes } from "sequelize"
import { conn } from "../db/Connection"
import { Client } from "./Client";


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
        type: DataTypes.STRING,
        allowNull: false
    },
    cvv: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export { Card }