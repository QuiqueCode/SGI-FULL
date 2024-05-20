import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Estados = sequelize.define(
  "T_ESTADOS",
  {
    CN_ID_ESTADO: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CT_DESCRIPCION: {
      type: DataTypes.STRING(200),
    },
  },
  {
    timestamps: false,
  }
);
