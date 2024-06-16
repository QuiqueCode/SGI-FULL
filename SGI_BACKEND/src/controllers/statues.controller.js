import { Afectacion } from "../models/Afectaciones.js";
import { Categoria } from "../models/Categoria.js";
import { Estados } from "../models/Estados.js";
import { Incidencia } from "../models/Incidencia.js";
import { Riesgos } from "../models/Riesgos.js";

export const getStatue = async (req, res) => {
  try {
    const data = await Estados.findAll({
      where: {
        CN_ID_ESTADO: [2, 10]
      }
    });
    return res.json(data);
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    return res.status(500).json({ error: "Error al obtener los estados" });
  }
};

export const getTechStatue = async (req, res) => {
  try {
      const data = await Estados.findAll({
      where: {
        CN_ID_ESTADO: [3,4,5,7,6]
      }
    });
    return res.json(data);
  } catch (error) {
    return error;
  }
};


export const getRisk = async (req, res) => {
  try {
    const data = await Riesgos.findAll();
    return res.json(data);
  } catch (error) {
    return error;
  }
};

export const getAffectation = async (req, res) => {
  try {
    const data = await Afectacion.findAll();
    return res.json(data);
  } catch (error) {
    return error;
  }
};

export const getCategory = async (req, res) => {
  try {
    const data = await Categoria.findAll();
    return res.json(data);
  } catch (error) {
    return error;
  }
};

//Actualizar estados

export const updateStatue = async (req, res) => {
  try {
    const {CN_ID_ESTADOF,CT_CODIGO_INCIDENCIA}=req.body;
    await Incidencia.update(
        { CN_ID_ESTADOF },
        {
          where: {
            CT_CODIGO_INCIDENCIA
          },
        },
      );
      res.status(200).json({ msg: "Estado cambiado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cambiar el estado" });
  }
};


export const updateRisk = async (req, res) => {
  try {
    const {CN_RIESGO,CT_CODIGO_INCIDENCIA}=req.body;
    await Incidencia.update(
        { CN_RIESGO},
        {
          where: {
            CT_CODIGO_INCIDENCIA
          },
        },
      );
      res.status(200).json({ msg: "Riesgo cambiado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cambiar el riesgo " });
  }
};


export const updateAffectation = async (req, res) => {
  try {
    const {CN_AFECTACION,CT_CODIGO_INCIDENCIA}=req.body;
    await Incidencia.update(
        { CN_AFECTACION},
        {
          where: {
            CT_CODIGO_INCIDENCIA
          },
        },
      );
      res.status(200).json({ msg: "Afectacion cambiada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cambiar la afectacion " });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const {CN_CATEGORIA,CT_CODIGO_INCIDENCIA}=req.body;
    await Incidencia.update(
        { CN_CATEGORIA},
        {
          where: {
            CT_CODIGO_INCIDENCIA
          },
        },
      );
      res.status(200).json({ msg: "Categoría cambiada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cambiar la categoría " });
  }
};
