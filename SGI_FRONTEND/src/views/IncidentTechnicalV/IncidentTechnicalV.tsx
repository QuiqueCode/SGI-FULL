import {
  briefcase,
  build,
  calendar,
  cog,
  navigate,
  person,
  play,
  returnUpBack,
  shield,
} from "ionicons/icons";
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import "./IncidentTechnicalStyle.css";
import { IonContent, IonIcon } from "@ionic/react";
import { IncidentTechnicalVM } from "../../viewModels/incidentTechnicalVM/IncidentTechnicalVM";
import { useEffect } from "react";

export const IncidentTechnicalV = () => {

  const {moveToDiagnostic,moveToList,setDetails, data,formatDateTime,sendDiagnosis,diagnosisData }=IncidentTechnicalVM();

  
  useEffect(()=>{
    setDetails();
    sendDiagnosis();
  },[])
  return (
    <>
      <IonContent fullscreen>
        <div className="backContainer">
          <p onClick={moveToList}>ATRÁS</p>
        </div>
        <div className="titleContainer">
          <h1 style={{ color: "#C0C0C0" }}>{"Incidencia: "+ data?.CT_CODIGO_INCIDENCIA}</h1>
        </div>

        <div className="bodyContainer7">
        <div className="icon-text">
            <IonIcon icon={build} className="icon" />
            <span>{"Titulo de la incidencia: "+data?.CT_TITULO_INCIDENCIA}</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={calendar} className="icon" />
            <span>{"Fecha y hora de registro: "+formatDateTime(data?.CF_FECHA_HORA_REGISTRO||'')}</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={person} className="icon" />
            <span>Solicitante: </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={play} className="icon" />
            <span style={{ marginRight: "15px" }}>Estado:</span>

            <div>
              <IonSelect
                aria-label="Fruit"
                placeholder="Seleccionar estado"
                onIonChange={(e) =>
                  console.log(`ionChange fired with value: ${e.detail.value}`)
                }
                onIonCancel={() => console.log("ionCancel fired")}
                onIonDismiss={() => console.log("ionDismiss fired")}
                className="custom-select"
              >
                <IonSelectOption value="apples">Apples</IonSelectOption>
                <IonSelectOption value="oranges">Oranges</IonSelectOption>
                <IonSelectOption value="bananas">Bananas</IonSelectOption>
              </IonSelect>
            </div>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Riesgo: "+ data?.CT_DESCRIPCION_RIESGO}</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Afectación: "+data?.CT_DESCRIPCION_AFECTACION} </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={navigate} className="icon" />
            <span>{"Lugar de afectación: "+data?.CT_LUGAR_DE_INCIDENCIA }</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={cog} className="icon" />
            <span>{"Categoría: "+data?.CT_DESCRIPCION_CATEGORIA} </span>
          </div>
        </div>



        <div className="cardContainer">
        <IonCard className="cardInfo">
      <IonCardHeader>
        <IonCardTitle class="cardtitle">Descripción</IonCardTitle>

      </IonCardHeader>

      <IonCardContent>{data?.CT_DESCRIPCION_INCIDENCIA}</IonCardContent>
    </IonCard>
        </div>
        
        <div className="cardContainer">
        <IonCard className="cardInfo">
      <IonCardHeader>
        <IonCardTitle class="cardtitle">Imagenes iniciales</IonCardTitle>

      </IonCardHeader>
      <IonCardContent>Imagenes</IonCardContent>
    </IonCard>
        </div>
        {diagnosisData.map((data,index)=>(
   <div className="cardContainer">
   <IonCard className="cardInfo" >
 <IonCardHeader>
 <IonCardSubtitle color={"tertiary"}>
  {"Tiempo estimado: "+data.CN_TIEMPO_SOLUCION_ESTIMADO+"h"}
 </IonCardSubtitle>
 <IonCardSubtitle color={"tertiary"}>
  {"Requiere compra: "+(data.CT_DIAGNOSTICO?"Sí":"No")}
 </IonCardSubtitle>
 <IonCardSubtitle color={"tertiary"}>
  {"Diagnostico: "+data.CT_DIAGNOSTICO}
 </IonCardSubtitle>
 <IonCardSubtitle color={"tertiary"}>
  {"Observaciones: "+data.CT_OBSERVACIONES}
 </IonCardSubtitle>
   <IonCardTitle class="cardtitle">{"Fecha: "+formatDateTime(data.CF_FECHA_HORA_DIAGNOSTICO)}</IonCardTitle>

 </IonCardHeader>
  
</IonCard>
   </div>

        )

        )}
        <div className="buttonContainer">
          <IonButton className="button2">Agregar Imagenes</IonButton>
          <IonButton className="button2" onClick={moveToDiagnostic}>Agregar Diagnostico</IonButton>
        </div>
      </IonContent>
    </>
  );
};
