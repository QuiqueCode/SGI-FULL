import { QueryTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { Categoria } from "../models/Categoria.js";
import { Incidencia } from "../models/Incidencia.js";

export const workReport=async(req,res)=>{
    try {
        // Obtener todas las categorías
        const categorias = await Categoria.findAll({
          attributes: ['CN_ID_CATEGORIA'],
          raw: true,
        });
    
        // Obtener los IDs de categoría
        const idsCategorias = categorias.map(categoria => categoria.CN_ID_CATEGORIA);
    
        // Arreglo para almacenar resultados finales
        let resultadosFinales = [];
    
        // Iterar sobre cada categoría
        for (const idCategoria of idsCategorias) {
          // Consultar las incidencias por categoría
          const query = `
            SELECT
              COUNT(*) AS total_incidencias,
              SUM(CASE WHEN CN_ID_ESTADOF != 10 THEN CN_DURACION_GESTION ELSE 0 END) AS trabajo_pendiente,
              SUM(CASE WHEN CN_ID_ESTADOF = 10 THEN CN_DURACION_GESTION ELSE 0 END) AS trabajo_terminado
            FROM T_INCIDENCIA
            WHERE CN_CATEGORIA = :idCategoria
            GROUP BY CN_CATEGORIA
          `;
    
          const incidencias = await sequelize.query(query, {
            replacements: { idCategoria: idCategoria },
            type: QueryTypes.SELECT,
          });
    
          // Consultar los técnicos asignados a incidencias de esta categoría
          const queryTecnicos = `
            SELECT DISTINCT
              UIA.CT_CEDULA_USUARIO_R AS CT_CEDULA_USUARIO_R
            FROM
              T_USUARIO_X_INCIDENCIA_ASIGNA UIA
              INNER JOIN T_INCIDENCIA I ON UIA.CT_CODIGO_INCIDENCIA_R = I.CT_CODIGO_INCIDENCIA
            WHERE
              I.CN_CATEGORIA = :idCategoria
          `;
    
          const tecnicos = await sequelize.query(queryTecnicos, {
            replacements: { idCategoria: idCategoria },
            type: QueryTypes.SELECT,
          });
    
          // Mapear los resultados para incluir solo las cédulas de los técnicos
          const tecnicosAsignados = tecnicos.map(tecnico => tecnico.CT_CEDULA_USUARIO_R);
    
          // Almacenar los resultados finales para esta categoría
          resultadosFinales.push({
            idCategoria: idCategoria,
            tecnicos: tecnicosAsignados,
            incidencias: incidencias[0], // Como estamos agrupando por categoría, solo hay un elemento en el array
          });
        }
    
        return res.json(resultadosFinales);
      } catch (error) {
        console.error('Error al obtener los técnicos por categoría:', error);
        throw error;
      }
}