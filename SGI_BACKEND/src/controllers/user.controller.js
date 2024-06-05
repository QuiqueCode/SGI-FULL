import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios.js";
import { UsuariosXroles } from "../models/UsuariosXRoles.js";

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