import { Afectacion } from "../models/Afectaciones.js"
import { Categoria } from "../models/Categoria.js"
import { Estados } from "../models/Estados.js"
import { Riesgos } from "../models/Riesgos.js"



export const getStatue =async(req,res)=>{
    try {
        const data= await Estados.findAll()
        return res.json(data)
    } catch (error) {
        return error
    }
}

export const getRisk =async(req,res)=>{
    try {
        const data= await Riesgos.findAll()
        return res.json(data)
    } catch (error) {
        return error
    }
}

export const getAffectation =async(req,res)=>{
    try {
        const data= await Afectacion.findAll()
        return res.json(data)
    } catch (error) {
        return error
    }
}

export const getCategory =async(req,res)=>{
    try {
        const data= await Categoria.findAll()
        return res.json(data)
    } catch (error) {
        return error
    }
}
