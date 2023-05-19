/**
 * Import of the {@link https://www.npmjs.com/package/sequelize sequelize} module
 */
import { DataTypes } from "sequelize";
/**
 * Import of the class {@link Connection}
 */
import { conn } from "../db/Connection";

/**
 * Class containing the "model" for the password change code of administrator type of users and their respective object type
 * @date 5/17/2023 - 3:25:28 AM
 *
 * @type {*}
 */
const AdministratorPasswordChangeCode = conn.define('administratorpasswordchangeCode',{
    //User password change code
    code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //User CPF number
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

export { AdministratorPasswordChangeCode };