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

