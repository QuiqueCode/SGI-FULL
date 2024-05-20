import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Prioridad = sequelize.define(
  "T_PRIORIDAD",
  {
    CN_ID_PRIORIDAD: {
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
