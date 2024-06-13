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
const { data,setData,setLoading,setError,loading,error,backToMenu,goToDetail,getData}=IncidentTechnicalVM();

  useEffect(() => {
    getData();
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
         <IonList inset={true} className="ionL"  >
           <div className="unread-indicator-wrapper" slot="start">
              <div className={incident.CN_PRIORIDAD === 1 ? "unread-indicatorL" : incident.CN_PRIORIDAD === 2 ? "unread-indicatorM" : "unread-indicatorH"}></div>
            </div>
      <IonCard>
      <img 
               
                src={`http://localhost:3000${incident.IMAGEN}`}
                alt={`Imagen ${incident.IMAGEN}`}
              />
      <IonCardHeader>
       
        <IonCardSubtitle>{"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent> {incident.CT_DESCRIPCION_INCIDENCIA} <br /><br />
      <IonButton
             slot="end" className="inButton" onClick={()=>{goToDetail(incident.CT_CODIGO_INCIDENCIA)}}> Ingresar</IonButton>
      </IonCardContent>
      
        
    </IonCard>
         </IonList>
   
  
 ))}
</div>
</IonContent>
  );
};

export default TechnicalIncidentList;
