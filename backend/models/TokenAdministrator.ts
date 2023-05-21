import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const TokenAdministrator = conn.define('tokenAdministrator', {

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