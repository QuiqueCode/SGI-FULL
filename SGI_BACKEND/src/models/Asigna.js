import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Incidencia } from "./Incidencia.js";
import { Usuarios } from "./Usuarios.js";

export const UsuarioxIncidenciaAsignacion= sequelize.define(
    "T_USUARIO_X_INCIDENCIA_ASIGNA",
    {
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12),
            references:{
                model:Usuarios,
                key:'CT_CEDULA'
            }
        },
        CT_CODIGO_INCIDENCIA_R:{
            type:DataTypes.STRING(11),
             references:{
                model:Incidencia,
                key:'CT_CODIGO_INCIDENCIA'
            }
        },

    },    {
        tableName: "T_USUARIO_X_INCIDENCIA_ASIGNA",
        timestamps: false
    },{timestamps:false})