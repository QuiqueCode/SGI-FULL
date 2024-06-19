import { Departamento } from "../models/Departamento.js"
import { Roles } from "../models/Roles.js"


export const getRoles= async(req,res)=>{
    
    try {
        const roles= await Roles.findAll({
            attributes:['CN_ID_ROL','CT_DESCRIPCION','CB_ESTADO']
        })
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(500).json({msg:"Error al obtener roles"})
    }
}

export const getDepartamentos= async(req,res)=>{

    try {
        const data= await Departamento.findAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({msg:"Error al obtener los departamentos"})
        
    }
}

export const suspendRol= async(req,res)=>{
try {
    const {CN_ID_ROL,CB_ESTADO}=req.body
    await Roles.update(
    {CB_ESTADO},
    {
        where:{
            CN_ID_ROL
        }
    }
    )
    return res.status(200).json({msg:"Actaulizacion de rol realizada"})
} catch (error) {
    return res.status(500).json({msg:"Error al suspender"})
}
}