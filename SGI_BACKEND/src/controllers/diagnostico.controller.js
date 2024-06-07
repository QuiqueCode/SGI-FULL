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
            CN_TIEMPO_SOLUCION_ESTIMADO,
            CT_DIAGNOSTICO,
            CT_OBSERVACIONES,
            CT_TECNICO,
            CB_REQUIERE_COMPRA
          })

          
          const CN_ID_DIAGNOSTICO_R=nuevoDiagnostico.CN_ID_DIAGNOSTICO;
          await IncidenciaXDiagnostico.create({CT_CODIGO_INCIDENCIA_R:CT_ID_INCIDENCIA,CN_ID_DIAGNOSTICO_R,CT_CEDULA_R:CT_TECNICO})
          return res.status(201).json({msg:'Diagnostico creado con exito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


};


export const getDiagnosis=async(req,res)=>{
    try {
        const {CT_CODIGO_INCIDENCIA_R}=req.query
        const diagnosisData=await IncidenciaXDiagnostico.findAll({
            where:{
                CT_CODIGO_INCIDENCIA_R
            }
        })
        const diagnosisId = diagnosisData.map(
            (diagnosis) => diagnosis.CN_ID_DIAGNOSTICO_R
          );
        const allDiagnosis= await Diagnostico.findAll({
            where:{
                CN_ID_DIAGNOSTICO:diagnosisId
            }
        })
        
        return res.json(allDiagnosis);
    } catch (error) {
        return res.status(500).json({messge:"Error en la consulta"})
    }
}