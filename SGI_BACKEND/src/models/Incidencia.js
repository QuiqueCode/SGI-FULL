import { DataTypes, INTEGER, Sequelize } from 'sequelize'
import {sequelize} from '../database/database.js'
import { Prioridad } from './Prioridad.js';
import { Riesgos } from './Riesgos.js';
import { Afectacion } from './Afectaciones.js';
import { Estados } from './Estados.js';
import { Categoria } from './Categoria.js';

export const Incidencia = sequelize.define('T_INCIDENCIA', {
    CT_CODIGO_INCIDENCIA: {
      type: DataTypes.STRING(11),
      primaryKey: true,
    },
    CF_FECHA_HORA_REGISTRO: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,

    },
    CT_CEDULA_USUARIO_CREADOR: {
      type: DataTypes.STRING(15),
    },  CT_CEDULA_USUARIO_QUE_ASIGNA: {
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
    CN_ID_ESTADOF: {
      type: DataTypes.INTEGER,
      references:{
        model:Estados,
        key:'CN_ID_ESTADO'
      }
    },
    CT_JUSTIFICACION_CIERRE: {
      type: DataTypes.STRING(200),
    },
    CN_PRIORIDAD: {
      type: DataTypes.INTEGER,
      references:{
        model:Prioridad,
        key:'CN_ID_PRIORIDAD'
      }
    },
    CN_RIESGO: {
      type: DataTypes.INTEGER,
      references:{
        model:Riesgos,
        key:'CN_ID_RIESGO'
      }
    },
    CN_AFECTACION: {
      type: DataTypes.INTEGER,
      references:{
        model:Afectacion,
        key:'CN_ID_AFECTACION'
      }
    },
    CN_CATEGORIA: {
      type: DataTypes.INTEGER,
      references:{
        model:Categoria,
        key:'CN_ID_CATEGORIA'
      }
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

