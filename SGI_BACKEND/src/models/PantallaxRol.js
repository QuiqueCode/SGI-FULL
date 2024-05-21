import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pantalla } from "./Pantallas.js";
import { Roles } from "./Roles.js";

export const PantallaXRol=sequelize.define(
    "T_PANTALLA_X_ROL",{
        CN_CODIGO_PANTALLA_R:{
            type:DataTypes.INTEGER,
            references:{
                model:Pantalla,
                key:'CN_CODIGO_PANTALLA'
            }
        },
        CN_ID_ROL_R:{
            type:DataTypes.INTEGER,
            references:{
                model: Roles,
                key:'CN_ID_ROL'
            }
        }
    },    {
        tableName: "T_PANTALLA_X_ROL",
        timestamps: false
    },{timestamps:false})