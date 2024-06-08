import { where } from "sequelize";
import { sequelize } from "../database/database.js";
import { UsuarioxIncidenciaAsignacion } from "../models/Asigna.js";
import { Estados } from "../models/Estados.js";
import { Incidencia } from "../models/Incidencia.js";
import { Usuarios } from "../models/Usuarios.js";
import { Imagenes } from "../models/Imagenes.js";



let CT_CODIGO_INCIDENCIA_R;
//USUARIO

async function generateUniqueCode() {
  const year = new Date().getFullYear();
  const prefijo = `${year}-`;

  // Encuentra el último registro y obtiene su código
  const ultimoRegistro = await Incidencia.findOne({
    order: [["CT_CODIGO_INCIDENCIA", "DESC"]],
  });

  let nuevoCodigo;
  if (!ultimoRegistro) {
    nuevoCodigo = `${prefijo}000001`;
  } else {
    const ultimoCodigo = ultimoRegistro.CT_CODIGO_INCIDENCIA;
    const ultimoNumero = parseInt(ultimoCodigo.split("-")[1], 10);
    const nuevoNumero = (ultimoNumero + 1).toString().padStart(6, "0");
    nuevoCodigo = `${prefijo}${nuevoNumero}`;
  }
CT_CODIGO_INCIDENCIA_R=nuevoCodigo
  return nuevoCodigo;
}

export const createIncident = async (req, res) => {
  try {
    const CT_CODIGO_INCIDENCIA = await generateUniqueCode();
    console.log(CT_CODIGO_INCIDENCIA);

    let {
      CT_TITULO_INCIDENCIA,
      CT_DESCRIPCION_INCIDENCIA,
      CT_LUGAR_DE_INCIDENCIA,
      CN_ID_ESTADOF,
      CT_CEDULA_USUARIO_CREADOR,
    } = req.body;

    //Faltan las imagenes.
    let datos = {
      CT_CODIGO_INCIDENCIA,
      CT_TITULO_INCIDENCIA,
      CT_DESCRIPCION_INCIDENCIA,
      CT_LUGAR_DE_INCIDENCIA,
      CN_ID_ESTADOF,
      CT_CEDULA_USUARIO_CREADOR,
    };
    console.log(datos);

    await Incidencia.create(datos);
    return res.status(201).json({ msg: "Incidencia creada con exito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Enviar imagenes

export const sendFirstImages = async (req, res) => {

  try {
    const CT_IMAGEN = `/images/${req.file.filename}`
    const sendImages=await Imagenes.create({
      CT_CODIGO_INCIDENCIA_R,CB_TIPO:0,CT_IMAGEN
    })
    return res.json(sendImages);
  } catch (error) {
    return InternalError(res, error);
  }
}


export const getIncident = async (req, res) => {
  try {
    const incidencias = await Incidencia.findAll({
      attributes: ["CT_CODIGO_INCIDENCIA", "CT_DESCRIPCION_INCIDENCIA"],
    });
    res.json(incidencias);
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    res.status(500).json({ error: "No se pudieron obtener las incidencias" });
  }
};

//GetImages
export const getImages=async(req,res)=>{
try {
  const {CT_CODIGO_INCIDENCIA_R}=req.query;
  const images= await Imagenes.findAll({
    attributes:[
      "CT_ID_IMAGEN",
      "CT_IMAGEN"
    ],
    where:{
      CT_CODIGO_INCIDENCIA_R
    }
  })
  res.json(images);
} catch (error) {
  console.error("Error al obtener Imagenes:", error);
  res.status(500).json({ error: "No se pudieron obtener las imagenes" });
}
}





//TÉCNICO
export const getTechnicianIncident = async (req, res) => {
  try {
    let {CT_CEDULA_USUARIO_R}= req.query
    const idIncidences = await UsuarioxIncidenciaAsignacion.findAll({
      attributes: ["CT_CODIGO_INCIDENCIA_R"],
      where: {
        CT_CEDULA_USUARIO_R
      },
    });
    const incidenceIds = idIncidences.map(
      (incidence) => incidence.CT_CODIGO_INCIDENCIA_R
    );
    const incidentsData = await Incidencia.findAll({
      attributes: [
        "CT_CODIGO_INCIDENCIA",
        "CT_DESCRIPCION_INCIDENCIA",
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_ESTADOS WHERE T_ESTADOS.CN_ID_ESTADO = T_INCIDENCIA.CN_ID_ESTADOF)"
          ),
          "CT_DESCRIPCION_ESTADO",
        ],
      ],
      where: {
        CT_CODIGO_INCIDENCIA: incidenceIds,
      },
    });

    res.json(incidentsData);
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    res
      .status(500)
      .json({ error: "No se pudieron obtener las incidencias del usuario" });
  }
};







//REVISAR

export const getIncidentData = async (req, res) => {
  let { CT_CODIGO_INCIDENCIA } = req.query;

  try {
    const incidentData = await Incidencia.findOne({
      attributes: [
        'CT_CODIGO_INCIDENCIA',
        'CF_FECHA_HORA_REGISTRO',
        'CT_CEDULA_USUARIO_CREADOR',
        'CT_CEDULA_USUARIO_QUE_ASIGNA',
        'CT_TITULO_INCIDENCIA',
        'CT_DESCRIPCION_INCIDENCIA',
        'CT_LUGAR_DE_INCIDENCIA',
        'CN_ID_ESTADOF',
        'CT_JUSTIFICACION_CIERRE',
        'CD_COSTO',
        'CN_DURACION_GESTION',
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_PRIORIDAD WHERE T_INCIDENCIA.CN_PRIORIDAD = T_PRIORIDAD.CN_ID_PRIORIDAD)"
          ),
          'CT_DESCRIPCION_PRIORIDAD'
        ],
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_RIESGOS WHERE T_INCIDENCIA.CN_RIESGO = T_RIESGOS.CN_ID_RIESGO)"
          ),
          'CT_DESCRIPCION_RIESGO'
        ],
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_AFECTACIONES WHERE T_INCIDENCIA.CN_AFECTACION = T_AFECTACIONES.CN_ID_AFECTACION)"
          ),
          'CT_DESCRIPCION_AFECTACION'
        ],
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_CATEGORIA WHERE T_INCIDENCIA.CN_CATEGORIA = T_CATEGORIA.CN_ID_CATEGORIA)"
          ),
          'CT_DESCRIPCION_CATEGORIA'
        ],
        
      ],
      where: {
        CT_CODIGO_INCIDENCIA
      }
    });

    if (!incidentData) {
      return res.status(404).json({ error: "La incidencia no fue encontrada" });
    }

    /*
    const usuariosAsignados = await UsuarioxIncidenciaAsignacion.findAll({
      where: {
        CT_CODIGO_INCIDENCIA_R: CT_CODIGO_INCIDENCIA
      }
    });

    const usuarioIds = usuariosAsignados.map(usuarios => usuarios.CT_CEDULA_USUARIO_R);
    const usuariosData = await Usuarios.findAll({
      attributes:[
        'CT_NOMBRE','CT_APELLIDO_UNO','CT_APELLIDO_DOS'
      ],
      where: {
        CT_CEDULA: usuarioIds
      }
    });
    */
    res.json(incidentData);
  } catch (error) {
    console.error("Error al obtener los datos del incidente:", error);
    res.status(500).json({ error: "No se pudieron obtener los datos del incidente" });
  }
};


