import { useState } from "react"
import { AsignableUserModel } from "../../models/AsignableUsersModel/AsignableUserModel"
import { AsignableUserService } from "../../services/AsignableUserService/AsignableUserService"
import { useHistory } from "react-router"


export function AsignableUserVM(){
    const [asignableUser,setAsignableUser]=useState<AsignableUserModel[]>([])
    const history=useHistory()
    const goBack=()=>{
        history.push('/managerDetail')
      }
    const getUserList=async()=>{
        try {
            const data= await AsignableUserService.fetchUsers();
            setAsignableUser(data);
            return console.log("Datos extraidos", data)
        } catch (error) {
            console.log("Fallo al extraer los datos de los usuarios")
        }   
    }
    const techAsign= async(id:any)=>{
        const CT_CEDULA_USUARIO_R = id;
        try {
        await AsignableUserService.techAsign(CT_CEDULA_USUARIO_R);  
        getUserList();
        console.log("Usuario asignado") 
        } catch (error) {
            console.log(error)
        }
    }
    return{
        getUserList,
        asignableUser,
        goBack,
        techAsign
    }
}