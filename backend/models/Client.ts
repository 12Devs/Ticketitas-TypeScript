import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";
import { Card } from "./Card";
import { TokenClient } from "./TokenClient";
import { Sale } from "./Sale";
import { Ticket } from "./Ticket";

const Client = conn.define('client',{
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

Client.hasOne(Card);
Client.hasMany(TokenClient);
Client.hasMany(Sale);
Client.hasMany(Ticket);

export { Client };

