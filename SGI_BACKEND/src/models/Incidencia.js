import { DataTypes, INTEGER } from 'sequelize'
import {sequelize} from '../database/database.js'

export const Incidencia = sequelize.define('T_INCIDENCIA', {
    CT_CODIGO_INCIDENCIA: {
      type: DataTypes.STRING(11),
      primaryKey: true,
    },
    CF_FECHA_HORA_REGISTRO: {
      type: DataTypes.DATE,
    },
    CT_CEDULA_USUARIO: {
      type: DataTypes.STRING(15),
    },
    CT_TITULO_INCIDENCIA: {
      type: DataTypes.STRING(25),
    },
    CT_DESCRIPCION_INCIDENCIA: {
      type: DataTypes.STRING(200),
    },
    CT_LUGAR_DE_INCIDENCIA: {
      type: DataTypes.STRING(35),
    },
    CN_ID_ESTADO: {
      type: DataTypes.BOOLEAN,
    },
    CT_JUSTIFICACION_CIERRE: {
      type: DataTypes.STRING(200),
    },
    CN_PRIORIDAD: {
      type: DataTypes.INTEGER,
    },
    CN_RIESGO: {
      type: DataTypes.INTEGER,
    },
    CN_AFECTACION: {
      type: DataTypes.INTEGER,
    },
    CN_CATEGORIA: {
      type: DataTypes.INTEGER,
    },
    CD_COSTO: {
      type: DataTypes.DOUBLE,
    },
    CN_DURACION_GESTION: {
      type: DataTypes.INTEGER,
    },
  },{
    timestamps: false,
  });


