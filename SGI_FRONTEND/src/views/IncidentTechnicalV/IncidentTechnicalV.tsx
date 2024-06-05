import {
  briefcase,
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

export const IncidentTechnicalV = () => {

  const {moveToDiagnostic,moveToList}=IncidentTechnicalVM();

  return (
    <>
      <IonContent fullscreen>
        <div className="backContainer">
          <p onClick={moveToList}>ATRÁS</p>
        </div>
        <div className="titleContainer">
          <h1 style={{ color: "#C0C0C0" }}>Incidente: </h1>
        </div>

        <div className="bodyContainer">
          <div className="icon-text">
            <IonIcon icon={calendar} className="icon" />
            <span>Fecha y hora de registro: </span>
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
                placeholder="Select fruit"
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
            <span>Riesgo:</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>Afectación: </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={navigate} className="icon" />
            <span>Lugar de afectación: </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={cog} className="icon" />
            <span>Categoría: </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={briefcase} className="icon" />
            <span>Técnicos asignados: </span>
          </div>
        </div>



        <div className="cardContainer">
        <IonCard className="cardInfo">
      <IonCardHeader>
        <IonCardTitle class="cardtitle">Descripción</IonCardTitle>

      </IonCardHeader>

      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
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
        <div className="buttonContainer">
          <IonButton className="button2">Agregar Imagenes</IonButton>
          <IonButton className="button2" onClick={moveToDiagnostic}>Agregar Diagnostico</IonButton>
        </div>
      </IonContent>
    </>
  );
};
