//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";
//import of the class Event
import { Event } from "./Event";
//import of the class TokenPromoter
import { TokenPromoter } from "./TokenPromoter";
//import of the class PromoterRegistrationRequest
import { PromoterRegistrationRequest } from "./PromoterRegistrationRequest";


/**
 * Class containing the "model" for the promoter and their respective object type
 * @date 6/12/2023 - 5:29:42 PM
 *
 * @type {*}
 */
const Promoter = conn.define('promoter',{
    /**
     * Promoter name
     */
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Promoter CPF
     */
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    /**
     * Promoter email
     */
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Promoter phone number
     */
    telefone: { 
        type: DataTypes.BIGINT,
        allowNull: false
    },
    /**
     * Promoter password hash
     */
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Promoter avatar image link
     */
    avatarImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    /**
     * Promoter status
     */
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
/** 
 * Establishes the relation link between {@link Promoter} and {@link Event}
 */
Promoter.hasMany(Event);
/**
 * Establishes the relation link between {@link Promoter} and {@link TokenPromoter}
 */
Promoter.hasMany(TokenPromoter);
/**
 * Establishes the relation link between {@link Promoter} and {@link PromoterRegistrationRequest}
 */
Promoter.hasOne(PromoterRegistrationRequest);

export { Promoter };

