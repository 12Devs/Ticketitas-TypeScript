//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the token client and their respective object type
 * @date 6/12/2023 - 5:48:10 PM
 *
 * @type {*}
 */
const TokenClient = conn.define('tokenClient', {
    /** 
     * Token client id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /** 
     * Token client refresh token
     */
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /** 
     * Token client expiration date
     */
    expiresDate: {
        type: DataTypes.DATE,
        allowNull: false 
    }
});

export { TokenClient };