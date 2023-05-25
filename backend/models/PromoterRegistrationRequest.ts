import { DataTypes } from "sequelize";
import { conn } from "../db/connection";


const PromoterRegistrationRequest = conn.define('promoterRegistrationRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { PromoterRegistrationRequest }