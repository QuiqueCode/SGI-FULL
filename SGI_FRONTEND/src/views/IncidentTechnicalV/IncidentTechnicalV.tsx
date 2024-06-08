import {
  briefcase,
  build,
  calendar,
  chevronForward,
  cog,
  navigate,
  person,
  play,
  returnUpBack,
  shield,
} from "ionicons/icons";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./IncidentTechnicalStyle.css";
import { IonContent, IonIcon } from "@ionic/react";
import { IncidentTechnicalVM } from "../../viewModels/incidentTechnicalVM/IncidentTechnicalVM";
import { useEffect } from "react";

export const IncidentTechnicalV = () => {
  const {
    moveToDiagnostic,
    moveToList,
    setDetails,
    data,
    formatDateTime,
    sendDiagnosis,
    diagnosisData,
    chargeImages,
    imagesData,
  } = IncidentTechnicalVM();

  useEffect(() => {
    setDetails();
    sendDiagnosis();
    chargeImages();
  }, []);
  return (
    <>
      <IonContent fullscreen>
        <div className="backContainer">
          <p onClick={moveToList}>ATRÁS</p>
        </div>
        <div className="titleContainer">
          <h1 style={{ color: "#C0C0C0" }}>
            {"Incidencia: " + data?.CT_CODIGO_INCIDENCIA}
          </h1>
        </div>

        <div className="bodyContainer7">
          <div className="icon-text">
            <IonIcon icon={build} className="icon" />
            <span>
              {"Titulo de la incidencia: " + data?.CT_TITULO_INCIDENCIA}
            </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={calendar} className="icon" />
            <span>
              {"Fecha y hora de registro: " +
                formatDateTime(data?.CF_FECHA_HORA_REGISTRO || "")}
            </span>
          </div>
          {/**
             <div className="icon-text">
            <IonIcon icon={person} className="icon" />
            <span>Solicitante: </span>
          </div> 
           
           */}
        
          <div className="icon-text">
            <IonIcon icon={play} className="icon" />
            <span style={{ marginRight: "15px" }}>Estado:</span>

            <div>
              <IonSelect
                aria-label="Statue"
                placeholder="Seleccionar estado"
                onIonChange={(e) =>
                  console.log(`ionChange fired with value: ${e.detail.value}`)
                }
                onIonCancel={() => console.log("ionCancel fired")}
                onIonDismiss={() => console.log("ionDismiss fired")}
                className="custom-select"
              >
                <IonSelectOption value="1">REGISTRADO</IonSelectOption>
                <IonSelectOption value="2">ASIGNADO</IonSelectOption>
                <IonSelectOption value="3">EN REVISIÓN</IonSelectOption>
                <IonSelectOption value="4">EN REPARACIÓN</IonSelectOption>
                <IonSelectOption value="5">PENDIENTE DE COMPRA</IonSelectOption>
                <IonSelectOption value="6">
                  CONTRATACIÓN EXTERNA
                </IonSelectOption>
                <IonSelectOption value="7">TERMINADO</IonSelectOption>
                <IonSelectOption value="8">APROBADO</IonSelectOption>
                <IonSelectOption value="9">RECHAZADO</IonSelectOption>
                <IonSelectOption value="10">CERRADO</IonSelectOption>
              </IonSelect>
            </div>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Riesgo: " + data?.CT_DESCRIPCION_RIESGO}</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Afectación: " + data?.CT_DESCRIPCION_AFECTACION} </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={navigate} className="icon" />
            <span>
              {"Lugar de afectación: " + data?.CT_LUGAR_DE_INCIDENCIA}
            </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={cog} className="icon" />
            <span>{"Categoría: " + data?.CT_DESCRIPCION_CATEGORIA} </span>
          </div>
        </div>

        <div className="cardContainer">
        <IonList style={{width:"100%",marginBottom:"10px",borderRadius:"8px"}}>
           <IonItem detail={false}>
             <IonLabel>
                {"Descripción: "} <br />
        
             <IonNote color="secondary" className="ion-text-wrap">
             {data?.CT_DESCRIPCION_INCIDENCIA}
               </IonNote>
               </IonLabel>
   
           </IonItem>
       
         </IonList>
     

    
     
        </div>

        <div className="cardContainer">
          <IonCard className="cardInfo">
            <IonCardHeader>
              <IonCardTitle class="cardtitle">Imagenes iniciales</IonCardTitle>
            </IonCardHeader>
            {imagesData.map((image, index) => (
              <img
                key={image.CT_ID_IMAGEN}
                src={`http://localhost:3000${image.CT_IMAGEN}`}
                alt={`Imagen ${image.CT_ID_IMAGEN}`}
              />
            ))}
          </IonCard>
        </div>
        <div className="cardContainer">
       
       
        {diagnosisData.map((data, index) => (
         
           <IonList style={{width:"100%",marginBottom:"10px",borderRadius:"8px"}}>
           <IonItem detail={false}>
             <IonLabel>
             <IonNote color="secondary" className="ion-text-wrap">
            {"Diagnostico #"+(index+1)}
            </IonNote><br />
             <IonNote color="dark" className="ion-text-wrap">
             {"Fecha: " + formatDateTime(data.CF_FECHA_HORA_DIAGNOSTICO)}
               </IonNote><br />
               <IonNote color="dark" className="ion-text-wrap">
               {"Tiempo estimado: " + data.CN_TIEMPO_SOLUCION_ESTIMADO + "h"}  
               </IonNote><br />
               <IonNote color="dark" className="ion-text-wrap">
               {"Requiere compra: " + (data.CT_DIAGNOSTICO ? "Sí" : "No")} <br />
               </IonNote>
               {"Diagnostico: " + data.CT_DIAGNOSTICO}<br />
               {"Observaciones: " + data.CT_OBSERVACIONES}
             </IonLabel>
   
           </IonItem>
       
         </IonList>
         
        ))}
         </div>
        <div className="buttonContainer">
          <IonButton className="button2">Agregar Imagenes</IonButton>
          <IonButton className="button2" onClick={moveToDiagnostic}>
            Agregar Diagnostico
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};
