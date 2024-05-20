import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Roles= sequelize.define(
    "T_ROLES",{
        CN_ID_ROL:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        CT_DESCRIPCION:{
            type:DataTypes.STRING(200)
        },
        CT_SISTEMA:{
            type:DataTypes.STRING
        },
        CB_ESTADO:{
            type:DataTypes.BOOLEAN
        }
    
    },{timestamps:false});