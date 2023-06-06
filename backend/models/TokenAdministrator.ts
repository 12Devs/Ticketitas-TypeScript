import { DataTypes } from "sequelize";
import { conn } from "../db/connection";

const TokenAdministrator = conn.define('tokenAdministrator', {
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

export { TokenAdministrator };