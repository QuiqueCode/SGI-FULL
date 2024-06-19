import { useState } from "react"
import { GetRolesModel } from "../../models/GetRolesModel/GetRolesModel"
import { GetRolesService } from "../../services/GetRolesService/GetRolesService"
import { useHistory } from "react-router"


export const rolAdministrationVM=()=>{
    const [roles,setRoles]=useState<GetRolesModel[]>([])
    const history=useHistory();
    const goToAdminView=()=>{
        history.push('/adminView')
    }
    const getRoles= async()=>{
        const data= await GetRolesService.fetchRoles();
        setRoles(data)
    }
    const suspendRole= async(data:any)=>{
        await GetRolesService.suspendRole(data);
        getRoles();
    }

    return{
        getRoles,
        roles,
        goToAdminView,
        suspendRole
    }
}