import { useState } from "react"
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";




export const IncidentListMV=()=>{
  const [data, setData] = useState<IncidentListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return{
    data,setData,setLoading,setError,loading,error
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