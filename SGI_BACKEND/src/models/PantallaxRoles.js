import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const PantallaxRoles= sequelize.define(
    "T_PANTALLA_X_ROL",{
        CN_CODIGO_PANTALLA_R:{
            type:DataTypes.INTEGER
        },
        CN_ID_ROL_R:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false})