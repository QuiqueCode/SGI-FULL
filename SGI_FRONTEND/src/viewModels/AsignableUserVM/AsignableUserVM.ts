import { useState } from "react"
import { AsignableUserModel } from "../../models/AsignableUsersModel/AsignableUserModel"
import { AsignableUserService } from "../../services/AsignableUserService/AsignableUserService"
import { useHistory } from "react-router"
import { IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";


export function AsignableUserVM(){
    const [detail,setDetail]=useState<IncidentTechnicianDetailM>();
    const [asignableUser,setAsignableUser]=useState<AsignableUserModel[]>([])
    const history=useHistory()
    const goBack=()=>{
        history.push('/managerDetail')
      }

      const setDetails=async()=>{
        try {
          const dataDetails= await IncidentTechnicianDetailService.viewTechnicianIncidentDetail();
          console.log(dataDetails)
          setDetail(dataDetails)
          console.log("Soy detail"+ detail)
        } catch (error) {
          console.log(error)
        }
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
        const datos={AFECTACION:detail?.CN_AFECTACION,
            PRIORIDAD:detail?.CN_PRIORIDAD,
            RIESGO:detail?.CN_RIESGO
        }
        console.log(JSON.stringify(datos))
        try {
        await AsignableUserService.techAsign(CT_CEDULA_USUARIO_R,datos);  
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
        techAsign,
        setDetails,
        detail
    }
}