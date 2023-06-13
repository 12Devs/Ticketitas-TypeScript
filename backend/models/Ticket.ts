//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the ticket and their respective object type
 * @date 6/12/2023 - 5:43:34 PM
 *
 * @type {*}
 */
const Ticket = conn.define('ticket', {
    /**
     * Ticket id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Ticket event name
     */
    nameEvent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Ticket sector
     */
    sector: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Ticket profile
     */
    profile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Ticket value
     */
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    /**
     * Ticket date event
     */
    dateEvent:{
        type: DataTypes.DATE,
        allowNull: false
    },
    /**
     * Ticket status
     */
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export { Ticket };