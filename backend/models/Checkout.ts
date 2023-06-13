//import of "DataTypes" from "sequelize" and "conn" from "../db/connection
import { DataTypes } from "sequelize"
import { conn } from "../db/connection"


/**
 * Class containing the "model" for the checkout of users and their respective object type
 * @date 6/12/2023 - 3:47:09 PM
 *
 * @type {*}
 */
const Checkout = conn.define('checkout', {
    /**
     * Checkout id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Checkout pista amount
     */
    pistaAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout stage amount 
     */
    stageAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout vip amount
     */
    vipAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout pista amount half price
     */
    pistaAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout stage amount half price
     */
    stageAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout vip amount half price
     */
    vipAmountHalf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout free amount
     */
    freeAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Checkout sale amount
     */
    amountSale:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export { Checkout }