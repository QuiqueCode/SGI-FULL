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
  IonItem,
  IonLabel,
  IonList,
  IonNote,
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

<IonSearchbar className="custom-searchbar" style={{width:"100%"}} placeholder="2024-00001"></IonSearchbar> <br />
 {data.map((incident,index) => (
         <IonList inset={true}  style={{width:"100%",marginBottom:"10px",borderRadius:"8px"}}>
           <IonItem  detail={false}>
         
             <IonLabel>
             
         
             <IonNote color="dark" className="ion-text-wrap">
             {"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}<br />
               </IonNote>
               <IonNote color="medium" className="ion-text-wrap">
               {"Estado: "+ incident.CT_DESCRIPCION_ESTADO} <br />
               </IonNote>
               <IonNote color="medium" className="ion-text-wrap">
               {incident.CT_DESCRIPCION_INCIDENCIA}
               </IonNote>
             </IonLabel>
         
             <IonButton
             slot="end" className="inButton" onClick={()=>{goToDetail(incident.CT_CODIGO_INCIDENCIA)}}> Ingresar</IonButton>
           </IonItem>
          
         </IonList>
   
  
 ))}
</div>
</IonContent>
  );
};

export default TechnicalIncidentList;
