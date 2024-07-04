import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { userAdminVM } from "../../viewModels/UserAdminVM/UserAdminVM";
import "./UserAdminStyle.css";

export default function UserAdminV() {
  const { getUsers, users, supendUser,   handleSearchChange,
    searchTerm,
    filteredData, goToBack, goToEdit } = userAdminVM();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getUsers()
      ]);
      setLoading(false); 
    }
    loadData();
   
  }, []);
  return (
    <>
      {loading ? (
        <IonSpinner name="crescent" color='light' className="loading-spinner2" />
      ) : (
        <IonContent fullscreen>
        <div className="backContainer">
          <p onClick={goToBack}>ATRÁS</p>
        </div>
        <div className="titleContainer">
          <h1 style={{ color: "#C0C0C0" }}>Lista de usuarios</h1>
        </div> <br />
        
        <div     style={{ marginLeft: "10px", marginRight: "10px" }}>
        <IonSearchbar
            value={searchTerm}
            onIonChange={handleSearchChange}
            className="custom-searchbar"
            placeholder="702880922"
        
          ></IonSearchbar>{" "}
        
        </div>
         
        
        {filteredData.map((data, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{"Cedula: " + data.CT_CEDULA}</IonCardTitle>
            </IonCardHeader>
        
            <IonCardContent>
              {`Nombre: ${data.CT_NOMBRE} ${data.CT_APELLIDO_UNO} ${data.CT_APELLIDO_DOS}`}{" "}
              <br /> {"Puesto: " + data.CT_PUESTO} <br />{" "}
              {"Departamento: " + data.DESCRIPCION_DEPARTAMENTO} <br />{" "}
              {"Correo: " + data.CT_CORREO}{" "}
            </IonCardContent>
        
            <IonButton
              fill="clear"
              style={{ width: "120px" }}
              onClick={() => {
                supendUser({ CT_CEDULA:data.CT_CEDULA, CB_ESTADO: !data.CB_ESTADO });
              }}
              className={data.CB_ESTADO ? "desactivateUser2" : "desactivateUser"}
            >
              {data.CB_ESTADO?"Suspender":"Activar"}
            </IonButton>
            <IonButton fill="clear" style={{ width: "120px" }} className="asign" onClick={()=>{goToEdit(data.CT_CEDULA)}}>
              Editar
            </IonButton>
          </IonCard>
        ))}
        </IonContent>
      )}
    </>
  );
}


/*

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
*/