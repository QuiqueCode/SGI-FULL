import { useEffect, useState } from "react";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
import "./TechnicalIncidentListStyle.css";
import { IonSearchbar } from '@ionic/react';
import { IncidentTechnicalVM, getIncidentTechnicianDataList } from "../../viewModels/incidentTechnicalVM/IncidentTechnicalVM";

const TechnicalIncidentList: React.FC = () => {
const { data,setData,setLoading,setError,loading,error,backToMenu,goToDetail}=IncidentTechnicalVM();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getIncidentTechnicianDataList();
        setData(result);
        setError(null); // Reset error if successful
      } catch (error) {
        console.error("Error al obtener incidencias:", error);
        setError("Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <IonContent fullscreen>
    <div className="backContainer">
   <p onClick={backToMenu}>ATRÁS</p> 
 </div>
 <div className="titleContainer">
 <h1 style={{color:'#C0C0C0'}}>Lista de incidencias</h1>
 </div>


<div className="bodyContainer">

<IonSearchbar className="custom-searchbar" placeholder="2024-00001"></IonSearchbar> <br />
 {data.map((incident) => (
  
     <IonCard key={incident.CT_CODIGO_INCIDENCIA} className="card">
       <IonCardHeader>
         <IonCardTitle className="title">
           {"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}
         </IonCardTitle>
         <IonCardSubtitle style={{color:'black'}}>
          
          {"Estado: "+ incident.CT_DESCRIPCION_ESTADO}
         </IonCardSubtitle>
       </IonCardHeader>
       <IonCardContent>
         {incident.CT_DESCRIPCION_INCIDENCIA}
       </IonCardContent>
       <div className="button-container">
     <IonButton className="inButton" onClick={()=>{goToDetail(incident.CT_CODIGO_INCIDENCIA)}}>Ingresar</IonButton>
   </div>
     </IonCard>
  
 ))}
</div>
</IonContent>
  );
};

export default TechnicalIncidentList;
