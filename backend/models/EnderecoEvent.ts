//Import of the "DaaTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Event
import { Event } from "./Event";


/**
 * Class containing the "model" for the address of events and their respective object type
 * @date 6/12/2023 - 4:57:44 PM
 *
 * @type {*}
 */
const EnderecoEvent = conn.define('enderecoEvent', {
    /**
     * Address id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Address CEP
     */
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**
     * Address state
     */
    estado: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    /**
     * Address city
     */
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Address neighborhood
     */
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Address street
     */
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Address number
     */
    numero: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

/**
* Estabilishes the relation link between {@link EnderecoEvent} and {@link Event}
*/
EnderecoEvent.hasMany(Event);

export { EnderecoEvent };