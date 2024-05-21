import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pantalla } from "./Pantallas.js";
import { Usuarios } from "./Usuarios.js";

export const BitacoraGenral = sequelize.define(
    "T_BITACORA_GENERAL",{
        CN_CODIGO:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12),
            references:{
                model: Usuarios,
                key:'CT_CEDULA'
            }
        },
        CT_CODIGO_PANTALLA_R:{
            type:DataTypes.INTEGER,
            references:{
                model:Pantalla,
                key:'CN_CODIGO_PANTALLA'
            }
        },
        CT_SISTEMA:{
            type:DataTypes.STRING(20)
        },
        CT_REFERENCIA:{
            type:DataTypes.STRING(200)
        }

    },    {
        tableName: "T_BITACORA_GENERAL",
        timestamps: false
    },{timestamps:false})