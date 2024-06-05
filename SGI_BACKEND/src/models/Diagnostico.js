import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { Incidencia } from "./Incidencia.js";
import { Usuarios } from "./Usuarios.js";

export const Diagnostico = sequelize.define(
    "T_DIAGNOSTICO",{

        CN_ID_DIAGNOSTICO:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_ID_INCIDENCIA:{
            type:DataTypes.STRING(11),
            references:{
                model:Incidencia,
                key:'CT_CODIGO_INCIDENCIA'
            }
        },
        CF_FECHA_HORA_DIAGNOSTICO:{
            type:DataTypes.DATE,
            defaultValue: Sequelize.NOW,
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
        CB_REQUIERE_COMPRA:{
            type:DataTypes.BOOLEAN
            
            },
        CT_TECNICO:{
            type:DataTypes.STRING(12),
            references:{
                model:Usuarios,
                key:'CT_CEDULA'
            }
        }
        
    },{timestamps:false})