import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuarios = sequelize.define(
    "T_USUARIOS",{

        CT_CEDULA:{
            type:DataTypes.STRING(12),
            primaryKey:true
        },
        CT_NOMBRE:{
            type:DataTypes.STRING(15)
        },
        CT_APELLIDO_UNO:{
            type:DataTypes.STRING(15)
        },
        CT_APELLIDO_DOS:{
            type:DataTypes.STRING(15)
        },
        CN_TELEFONO:{
            type:DataTypes.INTEGER(8)
        },
        CT_CORREO:{
            type:DataTypes.STRING(100)
        },
        CT_PUESTO:{
            type:DataTypes.STRING(30)
        },
        CN_DEPARTAMENTO:{
            type:DataTypes.INTEGER
        },
        CB_ESTADO:{
            type:DataTypes.BOOLEAN
        },
        CT_CONTRASENA:{
            type:DataTypes.STRING(25)
        }

},{timestamps:false})