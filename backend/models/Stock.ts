//Import of the "DataTypes" submodule from the "sequelize" module
import { DataTypes } from "sequelize";
//import of the connection object
import { conn } from "../db/connection";


/**
 * Class containing the "model" for the stock and their respective object type
 * @date 6/12/2023 - 5:42:49 PM
 *
 * @type {*}
 */
const Stock = conn.define('stock',{
    /**
     * Stock id
     */
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    /**
     * Stock quantity of tickets pista
     */
    quantPista:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * Stock quantity of tickets cadeira
     */
    quantStage:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * Stock quantity of tickets vip
     */
    quantVip:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

export { Stock };