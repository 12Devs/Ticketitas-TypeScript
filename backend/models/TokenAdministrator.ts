//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the token administrator and their respective object type
 * @date 6/12/2023 - 5:46:47 PM
 *
 * @type {*}
 */
const TokenAdministrator = conn.define('tokenAdministrator', {
    /** 
     * Token administrator id
     */    
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /** 
     * Token administrator refresh token
     */
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /** 
     * Token administrator expiration date
     */
    expiresDate: {
        type: DataTypes.DATE,
        allowNull: false 
    }
});

export { TokenAdministrator };