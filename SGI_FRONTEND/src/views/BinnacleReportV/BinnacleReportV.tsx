import { IonContent, IonItem, IonLabel, IonList, IonNote, IonSearchbar, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { BinnacleReportVM } from '../../viewModels/BinnacleReportVM/BinnacleReportVM';

export default function BinnacleReportV() {
    const {getData,data,goBack, handleSearchChange,searchTerm,filteredData }= BinnacleReportVM();
    const [loading, setLoading]=useState(true)

    useEffect(()=>{
      const loadData=async()=>{
        await Promise.all([
          getData()
        ])
        setLoading(false);
      }
        loadData();
    },[])
    
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
         <h1 style={{ color: "#C0C0C0" }}>Reporte de bítacoras</h1>
       </div> <br /> <br />
       <div     style={{ marginLeft: "16px", marginRight: "16px" }}>
        <IonSearchbar
             value={searchTerm}
             onIonChange={handleSearchChange}
             className="custom-searchbar"
             placeholder="702880922"
         
           ></IonSearchbar>{" "}
   
        </div> <br />
    
    
   {filteredData.map((value,index)=>(
       <IonList inset={true} key={index}>
   <IonItem detail={false}>
   <div className="unread-indicator-wrapper" slot="start"></div>
   <IonLabel>
   {"Usuario: "+ value.CT_CEDULA_USUARIO_R}
     <br />
     
     <IonNote color="medium" className="ion-text-wrap">
     {"Pantalla: "+ value.CT_CODIGO_PANTALLA_R} <br />
     </IonNote>
     <IonNote color="medium" className="ion-text-wrap">
       {"Sistema: "+ value.CT_SISTEMA} <br />
     </IonNote>
   
     <IonNote color="medium" className="ion-text-wrap">
       {"Referencia: " + value.CT_REFERENCIA} <br />
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
