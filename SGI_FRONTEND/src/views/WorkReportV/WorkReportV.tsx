import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { WorkReportVM } from "../../viewModels/WorkReportVM/WorkReportVM";

export default function WorkReportV() {
    const {getInfo,data,category,goBack}=WorkReportVM();

    useEffect(()=>{
     getInfo();
    },[])
  return (
    <IonContent fullscreen>
      <div className="backContainer">
        <p onClick={()=>{goBack()}}>ATRÁS</p>
      </div>
      <div className="titleContainer">
        <h1 style={{ color: "#C0C0C0" }}>Reporte cargas de trabajo</h1>
      </div>

    <br /> <br />
   {data.map((info,index)=>(

<IonList inset={true} >
<IonItem detail={false}>
  <div className="unread-indicator-wrapper" slot="start"></div>
  <IonLabel>
    { category[info.idCategoria-1] }
    <br />
    <IonNote color="medium" className="ion-text-wrap">
    {"Cantidad de técnicos: "+ info.tecnicos.length }
      <br />
    </IonNote>
    <IonNote color="medium" className="ion-text-wrap">
      {"Total de incidencias: " + info.incidencias.total_incidencias} <br />
    </IonNote>
    <IonNote color="medium" className="ion-text-wrap">
      {"Trabajo pendiente: " + info.incidencias.total_incidencias+"h"} <br />
    </IonNote>
    <IonNote color="medium" className="ion-text-wrap">
      {"Trabajo terminado: "+ info.incidencias.trabajo_terminado+"h" }
    </IonNote>
  </IonLabel>
</IonItem>
</IonList>
   ))}
      
     
    </IonContent>
  );
}
