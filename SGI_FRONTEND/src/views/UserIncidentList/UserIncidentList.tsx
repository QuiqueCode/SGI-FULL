import { IonButton, IonContent, IonItem, IonLabel, IonList, IonNote, IonSearchbar } from "@ionic/react";
import './UsrIncidentList.css'
import { UserIncidentListVM } from "../../viewModels/userIncidentListModel/UserIncidentListModel";
import { useEffect } from "react";

export const UserIncidentList=()=>{

  const {data,setData,setLoading,setError,loading,error, backToMenu,goTocreate,fetchData}= UserIncidentListVM();

  useEffect(()=>{
fetchData();

  },[])
    return(
        <IonContent fullscreen>
        <div className="backContainer">
       <p onClick={backToMenu}>ATRÁS</p> 
     </div>
     <div className="titleContainer">
     <h1 style={{color:'#C0C0C0'}}>Mis incidencias</h1>
     </div>

   <div className="headerContainer">
   <IonButton className="createButton" onClick={goTocreate}>Crear incidencia</IonButton> <br />
   
   <IonSearchbar className="custom-searchbar" placeholder="2024-00001"></IonSearchbar> <br />
   
   </div>
 {data.map((incident,index)=>(


<IonList inset={true} key={index}>
<IonItem  detail={false}>
  <div className="unread-indicator-wrapper" slot="start">
  </div>
  <IonLabel>
  {"Incidencia: "+ incident.CT_TITULO_INCIDENCIA}
  <br />

    <IonNote color="medium" className="ion-text-wrap">
    {"Estado: "+ incident.CT_DESCRIPCION_ESTADO} <br />
    </IonNote>
    <IonNote color="medium" className="ion-text-wrap">
    {"Descripción: " + incident.CT_DESCRIPCION_INCIDENCIA}
    </IonNote>
  </IonLabel>


</IonItem>

</IonList>

 ))}

        
      
    
 </IonContent>
);

}