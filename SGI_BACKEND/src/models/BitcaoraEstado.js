import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";
import { Incidencia } from "./Incidencia.js";
import { Estados } from "./Estados.js";

export const BitacoraEstados= sequelize.define(
    "T_BITACORA_CAMBIOS_ESTADO",{
        CN_CODIGO_BITACORA:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_CODIGO_INCIDENCIA_R:{
            type:DataTypes.STRING(11),
            references:{
                model: Incidencia,
                key:'CT_CODIGO_INCIDENCIA'
            }
        },
        CF_FECHA_CAMBIO_ESTADO:{
            type:DataTypes.DATE
        },
        CN_ESTADO_ACTUAL:{
            type:DataTypes.INTEGER,
            references:{
                model:Estados,
                key:'CN_ID_ESTADO'
            }
        },
         CN_ESTADO_NUEVO:{
            type:DataTypes.INTEGER,
            references:{
                model:Estados,
                key:'CN_ID_ESTADO'
            }
        },
        CT_CEDULA_USUARIO:{
            type:DataTypes.STRING(12)
        }
    },{timestamps:false})