//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Ticket
import { Ticket } from "./Ticket";

/**
 * Class containing the "model" for the sale and their respective object type
 * @date 6/12/2023 - 5:39:58 PM
 *
 * @type {*}
 */
const Sale = conn.define('sale',{
    /**
     * Sale id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Sale amount
     */
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});
/**
 * Establishes a relation link between {@link Sale} and {@link Ticket}
 */
Sale.hasMany(Ticket);

export { Sale };