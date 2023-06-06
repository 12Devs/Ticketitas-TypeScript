/**
 * Import of the {@link https://www.npmjs.com/package/sequelize sequelize} module
 */
import { DataTypes } from "sequelize";
/**
 * Import of the class {@link Connection}
 */
import { conn } from "../db/connection";
/**
 * Import of the class {@link Client}
 */
import { Client } from "./Client";

/**
 * Class containing the "model" for the password change code of client type of users and their respective object type
 * @date 5/17/2023 - 3:25:28 AM
 *
 * @type {*}
 */
const ClientPasswordChangeCode = conn.define('clientpasswordchangecode',{
    //User password change code
    code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //User CPF number
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Client,
            key: 'cpf'
        }
    }
});

export { ClientPasswordChangeCode };