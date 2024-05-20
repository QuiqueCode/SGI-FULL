import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Afectacion = sequelize.define(
  "T_AFECTACIONES",
  {
    CN_ID_AFECTACION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_DESCRIPCION: {
      type: DataTypes.STRING(200),
    },
  },
  {
    timestamps: false,
  }
);
