import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ReportWork2VM } from "../../viewModels/ReporWork2VM/ReportWork2VM";

export default function ReportWork2V() {
  const {
    getData,
    goBack,
    handleSearchChange,
    filteredData,
    searchTerm,
    estados,
    categoria,
  } = ReportWork2VM();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData=async()=>{
      await Promise.all([
        getData()
      ]);
      setLoading(false);
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
         <p onClick={goBack}>ATRÁS</p>
       </div>
       <div className="titleContainer">
         <h1 style={{ color: "#C0C0C0" }}>Reporte de trabajo</h1>
       </div>{" "}
       <br /> <br />
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
             <div className="unread-indicator-wrapper" slot="start"></div>
             <IonLabel>
               {"Código incidencia: " + data.CT_CODIGO_INCIDENCIA}
               <br />
 
               <IonNote color="medium" className="ion-text-wrap">
                 {"Estado: "+ estados[data.CN_ID_ESTADOF-1]} <br />
               </IonNote>
               <IonNote color="medium" className="ion-text-wrap">
                 {"Categoria: "+ categoria[data.CN_CATEGORIA-1]} <br />
               </IonNote>
 
               <IonNote color="medium" className="ion-text-wrap">
                 {"Cantidad de Técnicos: " + data.COUNT} <br />
               </IonNote>
             </IonLabel>
           </IonItem>
         </IonList>
       ))}
     </IonContent>
    )}
    </>
   
  );
}
