import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const UsuarioxIncidenciaCreacion= sequelize.define(
    "T_USUARIO_X_INCIDENCIA_CREA",{

        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12)
        },
        CT_CODIGO_INCIDENCIA_R:{
            type:DataTypes.STRING(11)
        }
    },{timestamps:false})