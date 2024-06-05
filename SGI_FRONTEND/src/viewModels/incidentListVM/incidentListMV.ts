import { useState } from "react"
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { useHistory } from "react-router";




export const IncidentListMV=()=>{
  const [data, setData] = useState<IncidentListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const history=useHistory();

  const backToMenu=()=>{
    history.push("/RolSelector")

  }
  
  //Recordar que es el id del incidente.
  const localeData=(idIncident:any)=>{
    localStorage.setItem(idIncident,"idIncident")
  }

  return{
    data,setData,setLoading,setError,loading,error, backToMenu
  }
}

export const getIncidentDataList= async ()=>{

    try {
    const datos = await IncidentListService.fetchIncidents();
    console.log("Datos extraidos")
    return datos;
    } catch (error) {
        console.log("Error en la extracción de datos")
        return [];
    }

}