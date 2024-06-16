import { IonButton, IonContent, IonItem, IonLabel, IonList, IonNote, IonSearchbar } from '@ionic/react';
import React, { useEffect } from 'react'
import { SupervisorIncidentCloseVM } from '../../viewModels/SupervisorIncidentCloseVM/SupervisorIncidentCloseVM';

export default function SupervisorIncidentCloseV() {
    const {  getIncidents,
        incidentL,
        goToMenu,goToDetail}= SupervisorIncidentCloseVM();

        useEffect(()=>{
            getIncidents();
        },[])
  return (
    <IonContent fullscreen>
    <div className="backContainer">
   <p onClick={()=>{goToMenu}}>ATRÁS</p> 
 </div>
 <div className="titleContainer">
 <h1 style={{color:'#C0C0C0'}}>Incidencias terminadas</h1>
 </div>


<div className="bodyContainerBar">

<IonSearchbar className="custom-searchbar" placeholder="2024-00001"></IonSearchbar> <br />

</div>


   {incidentL.map((data,index)=>(
    <IonList inset={true} key={index}>
    <IonItem  detail={false}>
   
      <IonLabel>
      {"Incidencia: "+data.CT_CODIGO_INCIDENCIA }
      <br />

        <IonNote color="medium" className="ion-text-wrap">
        {"Descripción: "+ data.CT_DESCRIPCION_INCIDENCIA}
        </IonNote>
      </IonLabel>
      <IonButton className="inItem" onClick={()=>{goToDetail(data.CT_CODIGO_INCIDENCIA)}}>Ingresar</IonButton>
 
    </IonItem>
   
  </IonList>


   ))}
    
</IonContent>
);
  
}
