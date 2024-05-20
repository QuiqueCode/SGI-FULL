import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const UsuarioxIncidenciaAsignacion= sequelize.define(
    "T_USUARIO_X_INCIDENCIA_ASIGNA",
    {
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12)
        },
        CT_CODIGO_INCIDENCIA_R:{
            type:DataTypes.STRING(11)
        },
        CF_FECHA_ASIGNACION:{
            type:DataTypes.DATE
        }

    },{timestamps:false})