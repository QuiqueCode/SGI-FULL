import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SupervisorIncidentCloseVM } from "../../viewModels/SupervisorIncidentCloseVM/SupervisorIncidentCloseVM";

export default function SupervisorIncidentCloseV() {
  const { getIncidents, incidentL, goToMenu, goToDetail,   handleSearchChange,
    filteredData,
    searchTerm, } =
    SupervisorIncidentCloseVM();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData=async()=>{
      await Promise.all([
        getIncidents()
      ]);
      setLoading(false)
    }
    loadData();

  }, []);
  return (
    <>
    {loading?(
        <IonSpinner name="crescent" color='light' className="loading-spinner2" />

    ):(
       <IonContent fullscreen>
       <div className="backContainer">
         <p
           onClick={() => {
             goToMenu();
           }}
         >
           ATRÁS
         </p>
       </div>
       <div className="titleContainer">
         <h1 style={{ color: "#C0C0C0" }}>Incidencias terminadas</h1>
       </div>
 <br /><br />
       <div     style={{ marginLeft: "16px", marginRight: "16px" }}>
      <IonSearchbar
           value={searchTerm}
           onIonChange={handleSearchChange}
           className="custom-searchbar"
           placeholder="2024-000001"
       
         ></IonSearchbar>{" "}
 
      </div> <br />
 
       {filteredData.map((data, index) => (
         <IonList inset={true} key={index}>
           <IonItem detail={false}>
             <IonLabel>
               {"Incidencia: " + data.CT_CODIGO_INCIDENCIA}
               <br />
 
               <IonNote color="medium" className="ion-text-wrap">
                 {"Descripción: " + data.CT_DESCRIPCION_INCIDENCIA}
               </IonNote>
             </IonLabel>
             <IonButton
               className="inItem"
               onClick={() => {
                 goToDetail(data.CT_CODIGO_INCIDENCIA);
               }}
             >
               Ingresar
             </IonButton>
           </IonItem>
         </IonList>
       ))}
     </IonContent>
    )}
    </>
   
  );
}
