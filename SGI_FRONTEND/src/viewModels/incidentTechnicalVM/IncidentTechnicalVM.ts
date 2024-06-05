import { useHistory } from "react-router";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { useState } from "react";
import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";
import { IncidentTechnicianListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";

export const IncidentTechnicalVM = () => {
  const [data, setData] = useState<IncidentTechnicianListModel[]>([]);
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
    goToDetail
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
