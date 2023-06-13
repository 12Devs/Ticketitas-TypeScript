//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";

/**
 * Class containing the "model" for the order and their respective object type
 * @date 6/12/2023 - 5:28:30 PM
 *
 * @type {*}
 */
const Order = conn.define('order',{
    /**
     * Order id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Order amount
     */
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export { Order };