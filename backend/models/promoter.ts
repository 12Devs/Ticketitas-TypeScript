import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Event } from "./Event";
import { TokenPromoter } from "./TokenPromoter";


const Promoter = conn.define('promoter',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: { 
        type: DataTypes.BIGINT,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatarImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Promoter.hasMany(Event);
Promoter.hasMany(TokenPromoter);

export { Promoter };

