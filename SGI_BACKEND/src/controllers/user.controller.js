import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios.js";
import { UsuariosXroles } from "../models/UsuariosXRoles.js";
import { Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";

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

async function assignRoles(ROLES, CT_CEDULA) {
  try {
    for (const element of ROLES) {
      let data = {
        CT_CEDULA_USUARIO_R: CT_CEDULA,
        CN_ID_ROL: element
      };
      await UsuariosXroles.create(data);
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser=async(req,res)=>{

  try {
    const {CT_CEDULA,CT_NOMBRE,
      CT_APELLIDO_UNO,CT_APELLIDO_DOS,CN_TELEFONO,
      CT_CORREO,CT_PUESTO,CN_DEPARTAMENTO,CB_ESTADO,CT_CONTRASENA, ROLES}=req.body;
      
      const data={CT_CEDULA,CT_NOMBRE,
      CT_APELLIDO_UNO,CT_APELLIDO_DOS,CN_TELEFONO,
      CT_CORREO,CT_PUESTO,CN_DEPARTAMENTO,CB_ESTADO,CT_CONTRASENA};
      await Usuarios.create(data);
      assignRoles(ROLES, CT_CEDULA)
     return res.status(201).json({msg:'Usuario creado con exito'});
      
    
  } catch (error) {
    return res.status(500).json({msg:"Error al crear usuario"})
  }
}



export const getAllUsers=async(req,res)=>{
try {
  const data= await Usuarios.findAll({
    attributes: [
      'CT_CEDULA',
      'CT_NOMBRE',
      'CT_APELLIDO_UNO',
      'CT_APELLIDO_DOS',
      'CT_CORREO',
      'CN_DEPARTAMENTO',
      'CB_ESTADO',
      'CT_PUESTO',
      [
        sequelize.literal('(SELECT CT_NOMBRE_DEPARTAMENTO FROM T_DEPARTAMENTOS WHERE T_DEPARTAMENTOS.CN_CODIGO_DEPARTAMENTO = T_USUARIOS.CN_DEPARTAMENTO)'),
        'DESCRIPCION_DEPARTAMENTO'
      ]
    ],
  });
  
  return res.status(200).json(data)
} catch (error) {
  return res.status(500).json({msg:"Erro al obtener usuarios"})
}
}

export const suspendUser= async(req,res)=>{
  try {
  const {CT_CEDULA,CB_ESTADO}=req.body
  await Usuarios.update(
    {CB_ESTADO},
    {
      where:{
        CT_CEDULA
      }
    }
  )
  return res.status(200).json({msg:"Usuario suspendido"})
  } catch (error) {
  return res.status(500).json({msg:"Error al suspende usuario"})
    
  }
}

export const getUser = async (req, res) => {
  try {
    const { CT_CEDULA } = req.query;
    const data = await Usuarios.findAll({
      attributes: [
        'CT_CEDULA',
        'CT_NOMBRE',
        'CT_APELLIDO_UNO',
        'CT_APELLIDO_DOS',
        'CT_CORREO',
        'CN_DEPARTAMENTO',
        'CB_ESTADO',
        'CT_CONTRASENA',
        'CT_PUESTO',
        'CN_TELEFONO',
        [
          sequelize.literal(`(
            SELECT CT_NOMBRE_DEPARTAMENTO
            FROM T_DEPARTAMENTOS
            WHERE T_DEPARTAMENTOS.CN_CODIGO_DEPARTAMENTO = T_USUARIOS.CN_DEPARTAMENTO
          )`),
          'DESCRIPCION_DEPARTAMENTO'
        ]
      ],
      where: {
        CT_CEDULA
      }
    });

    const rolesData = await UsuariosXroles.findAll({
      attributes: ['CN_ID_ROL'],
      where: {
        CT_CEDULA_USUARIO_R: CT_CEDULA
      }
    });

    // Combina los datos del usuario con sus roles
    const user = data[0].toJSON();
    user.ROLES = rolesData.map(role => role.CN_ID_ROL);
    
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};


//ACTUALIZAR USUARIOSSSSS
export const updateUser=async(req,res)=>{

  try {
    const {CT_NOMBRE,
      CT_APELLIDO_UNO,CT_APELLIDO_DOS,CN_TELEFONO,
      CT_CORREO,CT_PUESTO,CN_DEPARTAMENTO,CB_ESTADO,CT_CONTRASENA, ROLES}=req.body;

      const {CT_CEDULA_REAL}=req.query
      
      const data={CT_NOMBRE,
      CT_APELLIDO_UNO,CT_APELLIDO_DOS,CN_TELEFONO,
      CT_CORREO,CT_PUESTO,CN_DEPARTAMENTO,CB_ESTADO,CT_CONTRASENA};

      console.log(data,ROLES,CT_CEDULA_REAL);

      
      await Usuarios.update(data, {
        where: { CT_CEDULA: CT_CEDULA_REAL }
      });
   

       await UsuariosXroles.destroy({
        where: {
          CT_CEDULA_USUARIO_R: CT_CEDULA_REAL
        }
      });
  
      const rolesArray = ROLES.map(roleId => ({
        CT_CEDULA_USUARIO_R: CT_CEDULA_REAL,
        CN_ID_ROL: roleId
      }));
  
      await UsuariosXroles.bulkCreate(rolesArray)
  
    return res.status(201).json({msg:'Usuario creado con exito'});    
  } catch (error) {
    return res.status(500).json({msg:"Error al crear usuario"})
  }
}