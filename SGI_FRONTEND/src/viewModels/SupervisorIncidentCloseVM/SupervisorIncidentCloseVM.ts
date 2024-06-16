import { useState } from "react";
import { useHistory } from "react-router"
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { SupervisorIncidentCloseService } from "../../services/SupervisorIncidentCloseService/SupervisorIncidentCloseService";


export const SupervisorIncidentCloseVM=()=>{
    const history=useHistory();
    const [incidentL,setIncidentL]=useState<IncidentListModel[]>([]);

    const goToMenu=()=>{
        history.push('/RolSelector')
    }

    const getIncidents= async()=>{
        const data= await SupervisorIncidentCloseService.fetchIncidents();
        setIncidentL(data)
    }
    const goToDetail=(id:string)=>{
        //history.push("/managerDetail")
        localStorage.setItem('idIncident',id)
      }
    return {
        getIncidents,
        incidentL,
        goToMenu,
        goToDetail
    }
}