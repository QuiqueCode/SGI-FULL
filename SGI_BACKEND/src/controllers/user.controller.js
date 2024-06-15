import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios.js";
import { UsuariosXroles } from "../models/UsuariosXRoles.js";
import { Sequelize } from "sequelize";

let tokenPass = "Riki";

export const login = async (req, res) => {
  let { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await Usuarios.findOne({
      where: {
        CT_CORREO: email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (password === user.CT_CONTRASENA) {
      console.log("entre");

      // Obtener los roles del usuario
      const roles = await UsuariosXroles.findAll({
        where: {
          CT_CEDULA_USUARIO_R: user.CT_CEDULA
        },
        attributes: ['CN_ID_ROL']
      });

      // Extraer los CN_ID_ROL
      const rolesIds = roles.map(role => role.CN_ID_ROL);

      let payLoad = { 
        idUsuario: user.CT_CEDULA,
        roles: rolesIds 
      };

      let token = jwt.sign(payLoad, tokenPass, {
        expiresIn: "24h",
      });

      return res.json({
        token,
      });
    } else {
      return res.status(401).json({ msg: "Acceso denegado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error durante la transacción" });
  }
};


//Obtener usuarios para asignar

export const getAsignUsers=async(req,res)=>{
  try {
    const {CT_CODIGO_INCIDENCIA}=req.query
    const allUsers = await UsuariosXroles.findAll({
      attributes: [
        'CT_CEDULA_USUARIO_R',
        [Sequelize.literal(`(SELECT CONCAT(CT_NOMBRE," ",CT_APELLIDO_UNO," ",CT_APELLIDO_DOS) FROM T_USUARIOS WHERE T_USUARIOS.CT_CEDULA=CT_CEDULA_USUARIO_R)`),"NOMBRE_COMPLETO"],
        [
          Sequelize.literal(`(
            SELECT SUM(T_INCIDENCIA.CN_DURACION_GESTION) 
            FROM T_INCIDENCIA 
            WHERE T_INCIDENCIA.CT_CODIGO_INCIDENCIA IN (
              SELECT CT_CODIGO_INCIDENCIA_R 
              FROM T_USUARIO_X_INCIDENCIA_ASIGNA 
              WHERE T_USUARIO_X_INCIDENCIA_ASIGNA.CT_CEDULA_USUARIO_R = T_USUARIOS_X_ROLES.CT_CEDULA_USUARIO_R
            )
            AND T_INCIDENCIA.CN_ID_ESTADOF != 10
          )`),
          'DURACION_TOTAL'
        ],
        [
          Sequelize.literal(`(
            SELECT EXISTS (
              SELECT 1
              FROM T_USUARIO_X_INCIDENCIA_ASIGNA
              WHERE T_USUARIO_X_INCIDENCIA_ASIGNA.CT_CEDULA_USUARIO_R = T_USUARIOS_X_ROLES.CT_CEDULA_USUARIO_R
              AND T_USUARIO_X_INCIDENCIA_ASIGNA.CT_CODIGO_INCIDENCIA_R = '${CT_CODIGO_INCIDENCIA}'
            )
          )`),
          'INCIDENCIA_ASIGNADA'
        ],
      ],
      where: {
        CN_ID_ROL: 4
      }
    });
    return res.json(allUsers)
  } catch (error) {
    return res.status(500).json({msg:"Error al obtener usuarios"});
  }

 
}