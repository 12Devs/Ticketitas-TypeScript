import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";

const AccessCode = conn.define('accesscode',{
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

export { AccessCode };