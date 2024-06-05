import { Diagnostico } from "../models/Diagnostico.js";
import { IncidenciaXDiagnostico } from "../models/Incidencia_diagnostico.js";

export const createDiagnosis = async (req, res) => {

    try {
        const {
            CT_ID_INCIDENCIA,
            CN_TIEMPO_SOLUCION_ESTIMADO,
            CT_DIAGNOSTICO,
            CT_OBSERVACIONES,
            CT_TECNICO,
            CB_REQUIERE_COMPRA
          } = req.body;

         const nuevoDiagnostico= await Diagnostico.create({
            CT_ID_INCIDENCIA,
            CN_TIEMPO_SOLUCION_ESTIMADO,
            CT_DIAGNOSTICO,
            CT_OBSERVACIONES,
            CT_TECNICO,
            CB_REQUIERE_COMPRA
          })

          
          const CN_ID_DIAGNOSTICO_R=nuevoDiagnostico.CN_ID_DIAGNOSTICO;
          await IncidenciaXDiagnostico.create({CT_CODIGO_INCIDENCIA_R:CT_ID_INCIDENCIA,CN_ID_DIAGNOSTICO_R,CT_CEDULA_R:CT_TECNICO,CB_REQUIERE_COMPRA})
          return res.status(201).json({msg:'Diagnostico creado con exito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


};
