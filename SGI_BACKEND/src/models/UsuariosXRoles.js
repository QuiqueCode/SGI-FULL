import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";

export const UsuariosXroles= sequelize.define(
    "T_USUARIOS_X_ROLES",{
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12)
        },
        CN_ID_ROL:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false})