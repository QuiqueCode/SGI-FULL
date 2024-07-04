import { json, where } from "sequelize";
import { sequelize } from "../database/database.js";
import { UsuarioxIncidenciaAsignacion } from "../models/Asigna.js";
import { Estados } from "../models/Estados.js";
import { Incidencia } from "../models/Incidencia.js";
import { Usuarios } from "../models/Usuarios.js";
import { Imagenes } from "../models/Imagenes.js";
import { BitacoraEstados } from "../models/BitcaoraEstado.js";
import { BitacoraGenral } from "../models/BitacoraGeneral.js";
import nodemailer from "nodemailer";

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

    const data={
      CT_CODIGO_INCIDENCIA_R:CT_CODIGO_INCIDENCIA,
      CN_ESTADO_ACTUAL:null,
      CN_ESTADO_NUEVO:CN_ID_ESTADOF,
      CT_CEDULA_USUARIO_CREADOR
    }



    await Incidencia.create(datos);
    await BitacoraEstados.create(data);
    const date = await Incidencia.findOne({
      attributes:['CF_FECHA_HORA_REGISTRO'],
      where:{
        CT_CODIGO_INCIDENCIA
      }
    });

    const reportData={
      CT_CEDULA_USUARIO_R:CT_CEDULA_USUARIO_CREADOR,
      CT_CODIGO_PANTALLA_R:1,
      CT_SISTEMA:"SGI",
      CT_REFERENCIA:`Número de incidencia: ${CT_CODIGO_INCIDENCIA} - Usuario que crea: ${CT_CEDULA_USUARIO_CREADOR} - Fecha de creación: ${date.CF_FECHA_HORA_REGISTRO}`
    }
    await BitacoraGenral.create(reportData)
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

export const sendLastImages = async (req, res) => {

  try {
    const {CT_CODIGO_INCIDENCIA_R}=req.query
    const CT_IMAGEN = `/images/${req.file.filename}`
    const sendImages=await Imagenes.create({
      CT_CODIGO_INCIDENCIA_R,CB_TIPO:1,CT_IMAGEN
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

export const getIncidentUser=async(req,res)=>{
  try {
    const {CT_CEDULA_USUARIO_CREADOR}= req.query;
    const data= await Incidencia.findAll({
      attributes:["CT_CODIGO_INCIDENCIA","CT_TITULO_INCIDENCIA","CT_DESCRIPCION_INCIDENCIA",
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_ESTADOS WHERE T_ESTADOS.CN_ID_ESTADO = T_INCIDENCIA.CN_ID_ESTADOF)"
          ),
          "CT_DESCRIPCION_ESTADO",
        ],
      ],
      where:{
        CT_CEDULA_USUARIO_CREADOR
      },
      order: [["CF_FECHA_HORA_REGISTRO", "DESC"]] 
    })
    return res.json(data)
  } catch (error) {
    return res.status(404).json({message:"Datos no encontrados"});
  }
}


//GetImages
export const getImages=async(req,res)=>{
try {
  const {CT_CODIGO_INCIDENCIA_R,CB_TIPO}=req.query;
  const images= await Imagenes.findAll({
    attributes:[
      "CT_ID_IMAGEN",
      "CT_IMAGEN"
    ],
    where:{
      CT_CODIGO_INCIDENCIA_R,
      CB_TIPO
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
        "CT_DESCRIPCION_INCIDENCIA","CN_PRIORIDAD",
        [
          sequelize.literal(
            "(SELECT CT_DESCRIPCION FROM T_ESTADOS WHERE T_ESTADOS.CN_ID_ESTADO = T_INCIDENCIA.CN_ID_ESTADOF)"
          ),
          "CT_DESCRIPCION_ESTADO",
        ],
        [
          sequelize.literal(
            "(SELECT CT_IMAGEN FROM T_IMAGENES WHERE T_IMAGENES.CT_CODIGO_INCIDENCIA_R = T_INCIDENCIA.CT_CODIGO_INCIDENCIA LIMIT 1)"
          ),
          "IMAGEN",
        ]
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
        'CN_PRIORIDAD',
        'CN_RIESGO',
        'CN_CATEGORIA',
        'CN_AFECTACION',
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


//Asignar
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "dylancastillocr@gmail.com",
    pass: "zvza ghks xpbc bukz",
  },
});


export const technicianAsign= async(req,res)=>{
  try {
  const {CT_CEDULA_USUARIO_R,CT_CODIGO_INCIDENCIA_R}=req.query
  const {AFECTACION,PRIORIDAD,RIESGO}=req.body
/*
  await UsuarioxIncidenciaAsignacion.create({CT_CEDULA_USUARIO_R,CT_CODIGO_INCIDENCIA_R})
  await Incidencia.update(
    { CN_ID_ESTADOF: 2 },
    {
      where: {
        CT_CODIGO_INCIDENCIA: CT_CODIGO_INCIDENCIA_R
      },
    },
  );
  const reportData={
    CT_CEDULA_USUARIO_R:CT_CEDULA_USUARIO_R,
    CT_CODIGO_PANTALLA_R:3,
    CT_SISTEMA:'SGI',
    CT_REFERENCIA:`Numero de incidencia: ${CT_CODIGO_INCIDENCIA_R} - Código técnico = ${CT_CEDULA_USUARIO_R} - Afectación= ${AFECTACION} - Prioridad= ${PRIORIDAD} - Riesgo= ${RIESGO}`
  }
  await BitacoraGenral.create(reportData)*/
  const correo= await Usuarios.findAll({attributes:['CT_CORREO'],where:{CT_CEDULA:CT_CEDULA_USUARIO_R}})
  console.log(correo[0].CT_CORREO)
  main(correo[0].CT_CORREO,CT_CODIGO_INCIDENCIA_R)
  res.status(200).json({ msg: "Asignacion Realizada" });
  } catch (error) {
    console.error("Error al asignar:", error);
    res.status(500).json({ error: "No se pudo realizar la asignacion" });
  }

}
async function main(email,incidencia) {
  console.log(email.incidencia)
  const info = await transporter.sendMail({
    from: 'dylancastillocr@gmail.com', 
    to: email,
    subject: "Hola", 
    text: `Se te ha asignado una nueva incidencia. Especificamente la incidencia ${incidencia}`// plain text body
  });

  console.log("Message sent: %s", info.messageId);

}


export const jusitfyClousure=async(req,res)=>{
  const {CT_JUSTIFICACION_CIERRE,CT_CODIGO_INCIDENCIA}=req.body;
  try {
    await Incidencia.update(
      {CT_JUSTIFICACION_CIERRE},
      {
        where:{
          CT_CODIGO_INCIDENCIA
        }
      }
    )
    res.status(200).json({msg:"Justificacón almacenada"})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"Error al realizar la justificación"})
  }
}

export const getSupervisorIncident= async(req,res)=>{
  try {
    const data= await Incidencia.findAll({
      attributes:["CT_CODIGO_INCIDENCIA","CT_TITULO_INCIDENCIA","CT_DESCRIPCION_INCIDENCIA"],
      where:{
        CN_ID_ESTADOF:7
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({msg:"Error al obtener Incidencias"})
  }
}

export const setCost=async(req,res)=>{
  try {
  const {CT_CODIGO_INCIDENCIA,CD_COSTO}=req.body
  await Incidencia.update(
    {CD_COSTO},
    {
    where:{
      CT_CODIGO_INCIDENCIA
    }
  }
  )
  res.status(200).json({msg:"Costo Actualizado"})
  } catch (error) {
    res.status(500).json({msg:"Error al ingresar el costo"})
    console.log(error)
  }
}