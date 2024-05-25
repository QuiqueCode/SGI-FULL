import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios.js";

let tokenPass = "Riki";

export const login = async (req, res) => {
  let { email, password } = req.body;

  console.log(email, password);

  await Usuarios.findOne({
    where: {
      CT_CORREO: email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ msg: "Usuario no encontrado" });
      } else {
        if (password == user.CT_CONTRASENA) {
          console.log("entre");
          //RECORDAR TRAER LOS ROLES
          let payLoad= {idUsuario:user.CT_CEDULA}

          let token = jwt.sign(payLoad, tokenPass, {
            expiresIn: "24h", 
          });
          res.json({
            token,
          });
        } else {
          res.status(401).json({ msg: "Acceso denegado" });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error durante la transaccion" });
    });
};
