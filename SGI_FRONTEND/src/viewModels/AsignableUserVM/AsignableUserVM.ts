import { useState } from "react"
import { AsignableUserModel } from "../../models/AsignableUsersModel/AsignableUserModel"
import { AsignableUserService } from "../../services/AsignableUserService/AsignableUserService"
import { useHistory } from "react-router"


export function AsignableUserVM(){
    const [asignableUser,setAsignableUser]=useState<AsignableUserModel[]>([])
    const history=useHistory()
    const goBack=()=>{
        history.push('/supervisorDetail')
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
    return{
        getUserList,
        asignableUser,
        goBack
    }
}