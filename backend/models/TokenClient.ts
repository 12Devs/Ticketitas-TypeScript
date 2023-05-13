import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const TokenClient = conn.define('tokenClient', {

    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresDate: {
        type: DataTypes.DATE,
        allowNull: false 
    }
});



export { TokenClient };