import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Event } from "./Event";
import { TokenPromoter } from "./TokenPromoter";


const Promoter = conn.define('promoter',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Promoter.hasMany(Event);
Promoter.hasMany(TokenPromoter);

export { Promoter };

