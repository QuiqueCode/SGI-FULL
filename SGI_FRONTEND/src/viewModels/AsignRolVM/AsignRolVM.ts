import { useState } from "react";
import { useHistory } from "react-router"
import { GetRolesModel } from "../../models/GetRolesModel/GetRolesModel";
import { GetRolesService } from "../../services/GetRolesService/GetRolesService";

export const AsignRolVM=()=>{
    const history=useHistory();
    const [roles,setRoles]=useState<GetRolesModel[]>([])

    const goBack=()=>{
        history.push('/registerUserV')
    }
    const getRoles=async()=>{
     const data=await GetRolesService.fetchRoles();
     setRoles(data)
    }

    return{
        goBack,
        getRoles,
        roles

    }
}