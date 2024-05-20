import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Departamento = sequelize.define(
    "T_DEPARTAMENTO",{

        CN_CODIGO_DEPARTAMENTO:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        CT_NOMBRE_DEPARTAMENTO:{
            type:DataTypes.STRING(15)
        }


    },{timestamps:false})