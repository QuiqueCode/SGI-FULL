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
  const [searchTerm, setSearchTerm] = useState('');

// Función para manejar cambios en el IonSearchbar
const handleSearchChange = (e:any) => {
  setSearchTerm(e.target.value);
};
const filteredData = data.filter(incident =>
  incident.CT_CODIGO_INCIDENCIA.toLowerCase().includes(searchTerm.toLowerCase())
);



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


  const fetchData = async () => {
    try {
      const result = await getIncidentDataList();
      setData(result);
      setError(null); 
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
      setError("Error al obtner incidentes");
    } finally {
      setLoading(false);
    }
  };


  return{
    data,setData,setLoading,setError,loading,error, backToMenu, fetchData,goToDetail,goToReport,searchTerm,handleSearchChange,filteredData
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