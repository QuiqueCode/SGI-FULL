import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuarios } from "./Usuarios.js";
import { Roles } from "./Roles.js";


//TENGO DUDAS DE ESTA CONEXION  
export const UsuariosXroles= sequelize.define(
    "T_USUARIOS_X_ROLES",{
        CT_CEDULA_USUARIO_R:{
            type:DataTypes.STRING(12),
            references:{
                model: Usuarios,
                key:'CT_CEDULA'
            }
        },
        CN_ID_ROL:{
            type:DataTypes.INTEGER,
            references:{
                model:Roles,
                key:'CN_ID_ROL'
            }
        }
    },{timestamps:false})