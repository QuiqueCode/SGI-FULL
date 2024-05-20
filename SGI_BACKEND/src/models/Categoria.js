import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Categoria = sequelize.define(
  "T_CATEGORIA",
  {
    CN_ID_CATEGORIA: {
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
