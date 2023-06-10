import { DataTypes } from "sequelize"; //Import of the "DataTypes" submodule of the sequelize module

//Import of the connection and respective token objects
import { conn } from "../db/connection";
import { TokenAdministrator } from "./TokenAdministrator";

/**
 * Class containing the "model" for administrator type of users and their respective object type
 * @date 5/8/2023 - 9:21:47 PM
 *
 * @type {*}
 */
const Administrator = conn.define('administrator',{
    /**
     * User name
     */
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * User CPF number
     */
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    /**
     * User e-mail address
     */
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * User phone number
     */
    phone: { 
        type: DataTypes.BIGINT,
        allowNull: false
    },
    /**
     * User password hash
     */
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * User avatar image link
     */
    avatarImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

/** 
 * Establishes the relation link between {@link Administrator} and {@link TokenAdministrator}
 */
Administrator.hasMany(TokenAdministrator);

export { Administrator }; //Class export declarator