//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//Import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the promoter registration request and their respective object type
 * @date 6/12/2023 - 5:35:38 PM
 *
 * @type {*}
 */
const PromoterRegistrationRequest = conn.define('promoterRegistrationRequest', {
    /**
     * Promoter registration request id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Promoter registration request name
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /**
     * Promoter registration request email
     */
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { PromoterRegistrationRequest }