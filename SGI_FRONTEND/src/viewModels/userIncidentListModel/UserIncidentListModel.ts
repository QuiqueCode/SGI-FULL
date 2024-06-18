import { useHistory } from "react-router";
import { UserIncidentListService } from "../../services/UserIncidentListService/UserIncidentListService";
import { UserIncidentListM } from "../../models/UserIncidentListModel/UserIncidentLIst";
import { useState } from "react";

export const UserIncidentListVM = () => {
  const [data, setData] = useState<UserIncidentListM[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const backToMenu = () => {
    history.push("/RolSelector");
  };
  const goTocreate = () => {
    history.push("/Cincident");
  };
  //Recordar que es el id del incidente.

  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el IonSearchbar
  const handleSearchChange = (e:any) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter(incident =>
    incident.CT_CODIGO_INCIDENCIA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const datos = await UserIncidentListService.fetchIncidents();
      setData(datos);
      setError(null);
      console.log("Datos extraidos");
      return datos;
    } catch (error) {
      console.log("Error en la extracción de datos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    setLoading,
    setError,
    loading,
    error,
    backToMenu,
    goTocreate,
    fetchData,
    searchTerm,filteredData,
    handleSearchChange
  };
};

export const getIncidentDataList = async (
  setData: any,
  setError: any,
  setLoading: any
) => {
  try {
    const datos = await UserIncidentListService.fetchIncidents();
    setData(datos);
    setError(null);
    console.log("Datos extraidos");
    return datos;
  } catch (error) {
    console.log("Error en la extracción de datos");
    return [];
  } finally {
    setLoading(false);
  }
};
