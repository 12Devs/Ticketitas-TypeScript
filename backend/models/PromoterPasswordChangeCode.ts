/**
 * Import of the {@link https://www.npmjs.com/package/sequelize sequelize} module
 */
import { DataTypes } from "sequelize";
/**
 * Import of the class {@link Connection}
 */
import { conn } from "../db/Connection";

/**
 * Class containing the "model" for the password change code of promoter type of users and their respective object type
 * @date 5/17/2023 - 3:25:28 AM
 *
 * @type {*}
 */
const PromoterPasswordChangeCode = conn.define('promoterpasswordchangeCode',{
    //User password change code
    code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //User CPF number
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    }
});

export { PromoterPasswordChangeCode };