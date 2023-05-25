import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Event } from "./Event";
import { TokenPromoter } from "./TokenPromoter";
import { PromoterRegistrationRequest } from "./PromoterRegistrationRequest";


const Promoter = conn.define('promoter',{
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
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

Promoter.hasMany(Event);
Promoter.hasMany(TokenPromoter);
Promoter.hasOne(PromoterRegistrationRequest);

export { Promoter };

