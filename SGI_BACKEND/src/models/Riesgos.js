import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Riesgos= sequelize.define("T_RIESGOS",{
    CN_ID_RIESGO:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    CT_DESCRIPCION:{
        type:DataTypes.STRING(200),
    }
},{
    timestamps: false,
  })