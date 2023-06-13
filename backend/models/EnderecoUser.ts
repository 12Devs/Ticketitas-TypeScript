//import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Client
import { Client } from "./Client";
//import of the class Promoter
import { Promoter } from "./Promoter";


/**
 * Class containing the "model" for the address of users and their respective object type
 * @date 6/12/2023 - 5:07:38 PM
 *
 * @type {*}
 */
const EnderecoUser = conn.define('enderecoUser', {
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
* Estabilishes the relation link between {@link EnderecoUser} and {@link Client} 
*/
EnderecoUser.hasMany(Client);
/**
 * Estabilishes the relation link between {@link EnderecoUser} and {@link Promoter}
 */
EnderecoUser.hasMany(Promoter);

export { EnderecoUser };