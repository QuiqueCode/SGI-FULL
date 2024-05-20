import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const BitacoraGenral = sequelize.define(
    "T_BITACORA_GENERAL",{
        CN_CODIGO:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12)
        },
        CT_CODIGO_PANTALLA_R:{
            type:DataTypes.INTEGER
        },
        CT_SISTEMA:{
            type:DataTypes.STRING(20)
        },
        CT_REFERENCIA:{
            type:DataTypes.STRING(200)
        }

    },{timestamps:false})