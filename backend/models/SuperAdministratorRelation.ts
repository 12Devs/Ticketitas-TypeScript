/**
 * Import of the {@link https://www.npmjs.com/package/sequelize sequelize} module
 */
import { DataTypes } from "sequelize";
/**
 * Import of the class {@link Connection}
 */
import { conn } from "../db/Connection";

/**
 * Class containing the "model" for the cpf relation of "super user" kind of administrator
 * @date 5/17/2023 - 3:25:28 AM
 *
 * @type {*}
 */
const SuperAdministratorRelation = conn.define('superadminrelation',{
    //User CPF number
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    }
});

export { SuperAdministratorRelation };