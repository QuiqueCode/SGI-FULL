import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Incidencia } from "./Incidencia.js";
import { Diagnostico } from "./Diagnostico.js";
import { Usuarios } from "./Usuarios.js";

export const IncidenciaXDiagnostico = sequelize.define('T_INCIDENCIA_X_DIAGNOSTICO_X_USUARIO',{
    CT_CODIGO_INCIDENCIA_R:{
        type: DataTypes.STRING(11),
        references:{
            model:Incidencia,
            key:'CT_CODIGO_INCIDENCIA'
        }
    },
    CN_ID_DIAGNOSTICO_R:{
        type:DataTypes.INTEGER,
        references:{
            model:Diagnostico,
            key:'CN_ID_DIAGNOSTICO'
        }
    },
    CT_CEDULA_R:{
        type:DataTypes.STRING(12),
        references:{
            model:Usuarios,
            key:'CT_CEDULA'
        }
    },
})