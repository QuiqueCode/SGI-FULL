import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Diagnostico = sequelize.define(
    "T_DIAGNOSTICO",{

        CN_ID_DIAGNOSTICO:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_ID_INCIDENCIA:{
            type:DataTypes.STRING(11)
        },
        CF_FECHA_HORA_DIAGNOSTICO:{
            type:DataTypes.DATE
        },
        CT_DIAGNOSTICO:{
            type:DataTypes.STRING(200)
        },
        CN_TIEMPO_SOLUCION_ESTIMADO:{
            type:DataTypes.INTEGER
        },
        CT_OBSERVACIONES:{
            type:DataTypes.STRING(200)
        },
        CT_TECNICO:{
            type:DataTypes.STRING(12)
        }
        
    },{timestamps:true})