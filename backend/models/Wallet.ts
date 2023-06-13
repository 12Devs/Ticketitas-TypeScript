//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Client
import { Client } from "./Client";


/**
 * Class containing the "model" for the wallet and their respective object type
 * @date 6/12/2023 - 5:50:40 PM
 *
 * @type {*}
 */
const Wallet = conn.define('wallet',{
    /** 
     * Wallet cpf
     */
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Client,
            key: 'cpf'
        }
    },
    /** 
     * Wallet amount
     */
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export { Wallet };