import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";

export const BitacoraEstados= sequelize.define(
    "T_BITACORA_CAMBIOS_ESTADO",{
        CN_CODIGO_BITACORA:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_CODIGO_INCIDENCIA_R:{
            type:DataTypes.STRING(11)
        },
        CF_FECHA_CAMBIO_ESTADO:{
            type:DataTypes.DATE
        },
        CN_ESTADO_ACTUAL:{
            type:DataTypes.INTEGER
        },
         CN_ESTADO_NUEVO:{
            type:DataTypes.INTEGER
        },
        CT_CEDULA_USUARIO:{
            type:DataTypes.STRING(12)
        }
    },{timestamps:false})