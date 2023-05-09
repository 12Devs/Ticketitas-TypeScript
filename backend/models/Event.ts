import { DataTypes } from "sequelize";
import { conn } from "../db/Connection";


const Event = conn.define('event', {

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    quantPista: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    quantStage: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    quantVip: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    valorPista: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    valorStage: {
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    valorVip: {
        type: DataTypes.FLOAT,
        allowNull: false 
    }
});

export { Event };