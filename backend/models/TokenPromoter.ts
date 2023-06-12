//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the token promoter and their respective object type
 * @date 6/12/2023 - 5:48:56 PM
 *
 * @type {*}
 */
const TokenPromoter = conn.define('tokenPromoter', {
    /** 
     * Token promoter id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /** 
     * Token promoter refresh token
     */
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /** 
     * Token promoter expiration date
     */
    expiresDate: {
        type: DataTypes.DATE,
        allowNull: false 
    }
});

export { TokenPromoter };