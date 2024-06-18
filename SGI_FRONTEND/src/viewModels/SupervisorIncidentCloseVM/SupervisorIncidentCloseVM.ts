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
        history.push("/SupervisorIncidentDetail")
        localStorage.setItem('idIncident',id)
      }

      const [searchTerm, setSearchTerm] = useState('');

      // Función para manejar cambios en el IonSearchbar
      const handleSearchChange = (e:any) => {
        setSearchTerm(e.target.value);
      };
      const filteredData = incidentL.filter(incident =>
        incident.CT_CODIGO_INCIDENCIA.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return {
        getIncidents,
        incidentL,
        goToMenu,
        goToDetail,
        searchTerm,
        handleSearchChange,
        filteredData
    }
}