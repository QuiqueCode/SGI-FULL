import { sequelize } from "../database/database.js";
import { UsuarioxIncidenciaAsignacion } from "../models/Asigna.js";
import { Estados } from "../models/Estados.js";
import { Incidencia } from "../models/Incidencia.js";


async function generateUniqueCode() {
    const year = new Date().getFullYear();
    const prefijo = `${year}-`;
  
    // Encuentra el último registro y obtiene su código
    const ultimoRegistro = await Incidencia.findOne({
      order: [['CT_CODIGO_INCIDENCIA', 'DESC']]
    });
  
    let nuevoCodigo;
    if (!ultimoRegistro) {
      nuevoCodigo = `${prefijo}000001`;
    } else {
      const ultimoCodigo = ultimoRegistro.CT_CODIGO_INCIDENCIA;
      const ultimoNumero = parseInt(ultimoCodigo.split('-')[1], 10);
      const nuevoNumero = (ultimoNumero + 1).toString().padStart(6, '0');
      nuevoCodigo = `${prefijo}${nuevoNumero}`;
    }
  
    return nuevoCodigo;
  }


export const createIncident= async (req,res)=>{
    

    try {
        
    const CT_CODIGO_INCIDENCIA= await generateUniqueCode(); 
    console.log(CT_CODIGO_INCIDENCIA)

    let {CT_TITULO_INCIDENCIA,CT_DESCRIPCION_INCIDENCIA,CT_LUGAR_DE_INCIDENCIA
      ,CN_ID_ESTADOF,CT_CEDULA_USUARIO_CREADOR}= req.body;
  
    //Faltan las imagenes.
    let datos={CT_CODIGO_INCIDENCIA,
        CT_TITULO_INCIDENCIA,
        CT_DESCRIPCION_INCIDENCIA,
        CT_LUGAR_DE_INCIDENCIA,
        CN_ID_ESTADOF,
        CT_CEDULA_USUARIO_CREADOR};
        console.log(datos)

        await Incidencia.create(datos);
        return res.status(201).json({msg:'Incidencia creada con exito'});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getIncident= async (req,res)=>{

  try {
    const incidencias = await Incidencia.findAll({
      attributes: ['CT_CODIGO_INCIDENCIA', 'CT_DESCRIPCION_INCIDENCIA'],
    });
    res.json(incidencias);

  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    res.status(500).json({ error: 'No se pudieron obtener las incidencias' });
  }
}

export const getTechnicianIncident=async(req,res)=>{
  try {

    const idIncidences=await UsuarioxIncidenciaAsignacion.findAll({
      attributes:['CT_CODIGO_INCIDENCIA_R'],
      where:{
        CT_CEDULA_USUARIO_R:702880922

      }
    });
    const incidenceIds = idIncidences.map(incidence => incidence.CT_CODIGO_INCIDENCIA_R);

// Ahora busca las incidencias correspondientes en la tabla Incidencia
  // Luego, buscamos las incidencias y realizamos la unión con la tabla de estados
  const incidentsData = await Incidencia.findAll({
    attributes: [
      'CT_CODIGO_INCIDENCIA',
      'CT_DESCRIPCION_INCIDENCIA',
      [sequelize.literal('(SELECT CT_DESCRIPCION FROM T_ESTADOS WHERE T_ESTADOS.CN_ID_ESTADO = T_INCIDENCIA.CN_ID_ESTADOF)'), 'CT_DESCRIPCION_ESTADO']
    ],
    where: {
      CT_CODIGO_INCIDENCIA: incidenceIds
    }
  });

    res.json(incidentsData);

  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    res.status(500).json({ error: 'No se pudieron obtener las incidencias del usuario' });
  }

}