import { DataTypes } from "sequelize";
import { conn } from "../db/connection";

const TokenClient = conn.define('tokenClient', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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