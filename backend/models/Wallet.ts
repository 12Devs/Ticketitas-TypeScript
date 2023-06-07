import { DataTypes } from "sequelize";
import { conn } from "../db/connection";
import { Client } from "./Client";

const Wallet = conn.define('wallet',{
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Client,
            key: 'cpf'
        }
    },
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export { Wallet };