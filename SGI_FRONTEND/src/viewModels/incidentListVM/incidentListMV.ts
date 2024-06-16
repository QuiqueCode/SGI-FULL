import { useState } from "react"
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { useHistory } from "react-router";
import { InitialImagesModel } from "../../models/initialImages/InitialImages";
import { InitialImagesService } from "../../services/InitialImagesService/InitialImagesService";




export const IncidentListMV=()=>{
  const [imagesData,setImagesData]=useState<InitialImagesModel[]>([]);
  const [data, setData] = useState<IncidentListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const history=useHistory();

  const backToMenu=()=>{
    history.push("/RolSelector")

  }

  const goToDetail=(id:string)=>{
    history.push("/managerDetail")
    localStorage.setItem('idIncident',id)
  }
  const goToReport=()=>{
    
    history.push('/reportSelector')
  }
  //Recordar que es el id del incidente.


  const fetchData = async () => {
    try {
      const result = await getIncidentDataList();
      setData(result);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
      setError("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };


  return{
    data,setData,setLoading,setError,loading,error, backToMenu, fetchData,goToDetail,goToReport
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