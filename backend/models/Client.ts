//import of the "DataTypes" of sequelize
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the "Card" object
import { Card } from "./Card";
//import of the "TokenClient" object
import { TokenClient } from "./TokenClient";
//import of the "Sale" object
import { Sale } from "./Sale";
//import of the "Ticket" object
import { Ticket } from "./Ticket";
//import of the "Wallet" object
import { Wallet } from "./Wallet";


/**
 * Class containing the "model" for the client of users and their respective object type
 * @date 6/12/2023 - 4:30:08 PM
 *
 * @type {*}
 */
const Client = conn.define('client',{
    /**
     * Client name
     */
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Client CPF
     */
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    /**
     * Client e-mail address
     */
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Client phone number
     */
    telefone: { 
        type: DataTypes.BIGINT,
        allowNull: false
    },
    /**
     * Client password hash
     */
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Client avatar image link
     */
    avatarImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

/**
* Establishes the relation link between {@link Client} and {@link Card}     
*/
Client.hasOne(Card);
/**
* Establishes the relation link between {@link Client} and {@link TokenClient}     
*/
Client.hasMany(TokenClient);
/**
* Establishes the relation link between {@link Client} and {@link Sale}     
*/
Client.hasMany(Sale);
/**
* Establishes the relation link between {@link Client} and {@link Ticket}     
*/
Client.hasMany(Ticket);

export { Client };

