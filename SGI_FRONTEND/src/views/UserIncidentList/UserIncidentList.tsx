import { IonButton, IonContent, IonItem, IonLabel, IonList, IonNote, IonSearchbar, IonSpinner } from "@ionic/react";
import './UsrIncidentList.css'
import { UserIncidentListVM } from "../../viewModels/userIncidentListModel/UserIncidentListModel";
import { useEffect } from "react";

export const UserIncidentList=()=>{

  const {data,setData,setLoading,setError,loading,error, backToMenu,goTocreate,fetchData ,handleSearchChange,
    filteredData,
    searchTerm}= UserIncidentListVM();

  useEffect(()=>{
    const loadData=async()=>{
      await Promise.all([
        fetchData()
      ]);
      setLoading(false)
    }
    loadData()
  },[])
    return(

      <>
      {loading?(
        <IonSpinner name="crescent" color='light' className="loading-spinner2" />

      ):(
         <IonContent fullscreen>
         <div className="backContainer">
        <p onClick={backToMenu}>ATRÁS</p> 
      </div>
      <div className="titleContainer">
      <h1 style={{color:'#C0C0C0'}}>Mis incidencias</h1>
      </div>
 
    <div className="headerContainer">
    <IonButton className="createButton" onClick={goTocreate}>Crear incidencia</IonButton> <br />
    
    <IonSearchbar       value={searchTerm}
          onIonChange={handleSearchChange} className="custom-searchbar" placeholder="2024-00001"></IonSearchbar> <br />
    
    </div>
  {filteredData.map((incident,index)=>(
 
 
 <IonList inset={true} key={index}>
 <IonItem  detail={false}>
   <div className="unread-indicator-wrapper" slot="start">
   </div>
   <IonLabel>
   {"Incidencia: "+ incident.CT_CODIGO_INCIDENCIA}
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
      )}
      </>
       
);

}