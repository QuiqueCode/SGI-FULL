import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Imagenes = sequelize.define(
  "T_IMAGENES",
  {
    CT_ID_IMAGEN: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CT_CODIGO_INCIDENCIA_R: {
      type: DataTypes.STRING(11),
    },
    CT_IMAGEN: {
      type: DataTypes.STRING(255),
    },
    CB_TIPO: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
