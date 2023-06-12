//Import of the "DaaTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize"

//import of the connection object
import { conn } from "../db/connection"



/**
 * Class containing the "model" for the card of users and their respective object type
 * @date 6/12/2023 - 3:32:00 PM
 *
 * @type {*}
 */
const Card = conn.define('card', {
    /**
     * Card id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Card number
     */
    cardNumber:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    /**
     * Card holder name
     */
    holder:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * Card expiration date
     */
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    /**
     * Card CVV
     */
    cvv: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { Card }