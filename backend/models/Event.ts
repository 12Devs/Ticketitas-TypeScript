//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Sale
import { Sale } from "./Sale";
//import of the class Stock
import { Stock } from "./Stock";
//import of the class Checkout
import { Checkout } from "./Checkout";
//import of the class Ticket
import { Ticket } from "./Ticket";


/**
 * Class containing the "model" for the event and their respective object type
 * @date 6/12/2023 - 5:13:51 PM
 *
 * @type {*}
 */
const Event = conn.define('event', {
    /**
     * Event id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Event name
     */
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Event description
     */
    descricao: {
        type: DataTypes.TEXT('long'),
        allowNull: false 
    },
    /**
     * Event date
     */
    dataEvento: {
        type: DataTypes.DATE(),
        allowNull: false 
    },
    /**
     * Event status
     */
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    /**
     * Event quantity of tickets pista
     */
    quantPista: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    /**
     * Event quantity of tickets stage
     */
    quantStage: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    /**
     * Event quantity of tickets vip
     */
    quantVip: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    /**
     * Event value of tickets pista
     */
    valorPista: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    /**
     * Event value of tickets stage
     */
    valorStage: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    /**
     * Event value of tickets vip
     */
    valorVip: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    /**
     * Event image
     */
    imageEvent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    /**
     * Event highlight
     */
    destaque: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    /**
     * Event percentage of half tickets
     */
    porcentagemMeia: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 40.00
    },
    /**
     * Event percentage of free tickets
     */
    porcentagemGratis: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    }
});
/**
 * Estabilishes the relation link between {@link Event} and {@link Checkout}
 */
Event.hasMany(Checkout);
/**
 * Estabilishes the relation link between {@link Event} and {@link Sale}
 */
Event.hasMany(Sale);
/**
 * Estabilishes the relation link between {@link Event} and {@link Ticket}
 */
Event.hasMany(Ticket);
/**
 * Estabilishes the relation link between {@link Event} and {@link Stock}
 */
Event.hasOne(Stock);

export { Event };