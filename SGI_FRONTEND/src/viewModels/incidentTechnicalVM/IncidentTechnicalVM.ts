import { useHistory } from "react-router";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { useState } from "react";
import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";
import { DiagnosisIncidentListService, IncidentTechnicianListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";
import { IncidentDiagnosisListM, IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";

export const IncidentTechnicalVM = () => {
  const [data, setData] = useState<IncidentTechnicianDetailM>();
  const [diagnosisData,setDiagnosis]=useState<IncidentDiagnosisListM[]>([]);;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();


  const moveToDiagnostic = () => {
    history.push("/diagnostic");
  };

  const moveToList = () => {
    history.push("/TechIncidentsList");
  };
  const backToMenu=()=>{
    history.push("/RolSelector")

  }
  const goToDetail=(id:string)=>{
    history.push("/TechIncidentDetail");
    localStorage.setItem('idIncident',id)
  }

  function formatDateTime(isoString:string) {
    // Crear un objeto Date a partir de la cadena ISO
    const date = new Date(isoString);
  
    // Obtener los componentes de la fecha y hora
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Formatear los componentes para que tengan siempre dos dígitos
    const formattedDay = day.toString();
    const formattedMonth = month.toString();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // Construir la cadena final
    return `${formattedDay} / ${formattedMonth} / ${year} - ${formattedHours}:${formattedMinutes}`;
  }

   const setDetails=async()=>{
    try {
      const id:any=localStorage.getItem('idIncident');
      const dataDetails= await IncidentTechnicianDetailService.viewTechnicianIncidentDetail(id);
      setData(dataDetails)
    } catch (error) {
      console.log(error)
    }
  }

  const sendDiagnosis= async()=>{
    try {
      const diagnosis=await DiagnosisIncidentListService.fetchDiagnosis();
      setDiagnosis(diagnosis);
      console.log(diagnosisData)
    } catch (error) {
      
    }
  }
  
  return {
    moveToDiagnostic,
    moveToList,
    data,
    setData,
    setLoading,
    setError,
    loading,
    error,
    backToMenu,
    goToDetail,
    setDetails,
    formatDateTime,
    sendDiagnosis,
    diagnosisData
  };
};

export const getIncidentTechnicianDataList = async () => {
  try {
    const datos = await IncidentTechnicianListService.fetchIncidents();
    console.log("Datos extraidos");
    return datos;
  } catch (error) {
    console.log("Error en la extracción de datos");
    return [];
  }
};
