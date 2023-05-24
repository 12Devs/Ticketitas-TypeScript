/**
 * Import of the {@link https://www.npmjs.com/package/sequelize sequelize} module
 */
import { DataTypes } from "sequelize";
/**
 * Import of the class {@link Connection}
 */
import { conn } from "../db/Connection";
/**
 * Import of the class {@link TokenAdministrator}
 */
import { TokenAdministrator } from "./TokenAdministrator";

/**
 * Class containing the "model" for administrator type of users and their respective object type
 * @date 5/8/2023 - 9:21:47 PM
 *
 * @type {*}
 */
const Administrator = conn.define('administrator',{
    //User name
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //User CPF number
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    //User e-mail address
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //User telephone number
    telefone: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //User once-encrypted password hash
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //User avatar image
    avatarImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
});



Administrator.sync({alter: true});


    
//Administrator.hasMany(TokenAdministrator);

export { Administrator };