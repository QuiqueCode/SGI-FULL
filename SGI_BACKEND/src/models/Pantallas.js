import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Pantalla = sequelize.define(
    "T_PANTALLAS",{
        CN_CODIGO_PANTALLA:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        CT_NOMBRE_PANTALLA:{
            type:DataTypes.STRING(25)
        },
        CT_DESCRIPCION_PANTALLA:{
            type:DataTypes.STRING(200)
        }
    },{timestamps:false})