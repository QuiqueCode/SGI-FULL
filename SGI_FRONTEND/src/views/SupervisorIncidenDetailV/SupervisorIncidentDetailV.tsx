import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useEffect } from "react";
import { SuperVisorDetailVM } from "../../viewModels/SupervisorIncidentDetailVM/SupervisorIncidentDetailVM";
import { build, calendar, cog, navigate, play, shield } from "ionicons/icons";

export default function SupervisorIncidentDetailV() {
  const {
    moveToList,
    setDetails,
    formatDateTime,
    diagnosisData,
    chargeImages,
    imagesData,
    detail,
    statue,
    getStatues,
    handleStatue,
    imagesData2,
    sendDiagnosis,
    images,
    cost,
    handleInputChange,
    sendCost,
  } = SuperVisorDetailVM();
  useEffect(() => {
    setDetails();
    sendDiagnosis();
    chargeImages();
    getStatues();
  }, []);
  return (
    <>
      <IonContent fullscreen>
        <div className="backContainer">
          <p onClick={moveToList}>ATRÁS</p>
        </div>
        <div className="titleContainer">
          <h1 style={{ color: "#C0C0C0" }}>
            {"Incidencia: " + detail?.CT_CODIGO_INCIDENCIA}
          </h1>
        </div>

        <div className="bodyContainer7">
          <div className="icon-text">
            <IonIcon icon={build} className="icon" />
            <span>
              {"Titulo de la incidencia: " + detail?.CT_TITULO_INCIDENCIA}
            </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={calendar} className="icon" />
            <span>
              {"Fecha y hora de registro: " +
                formatDateTime(detail?.CF_FECHA_HORA_REGISTRO || "")}
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
                  handleStatue({
                    CN_ID_ESTADOF: e.detail.value,
                    CT_CODIGO_INCIDENCIA:
                      localStorage.getItem("idIncident") || "",
                  })
                }
                value={detail?.CN_ID_ESTADOF}
                onIonCancel={() => console.log("ionCancel fired")}
                onIonDismiss={() => console.log("ionDismiss fired")}
                className="customSelec"
              >
                {statue.map((data, index) => (
                  <IonSelectOption key={index} value={data.CN_ID_ESTADO}>
                    {data.CT_DESCRIPCION}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Riesgo: " + detail?.CT_DESCRIPCION_RIESGO}</span>
          </div>
          <div className="icon-text">
            <IonIcon icon={shield} className="icon" />
            <span>{"Afectación: " + detail?.CT_DESCRIPCION_AFECTACION} </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={navigate} className="icon" />
            <span>
              {"Lugar de afectación: " + detail?.CT_LUGAR_DE_INCIDENCIA}
            </span>
          </div>
          <div className="icon-text">
            <IonIcon icon={cog} className="icon" />
            <span>{"Categoría: " + detail?.CT_DESCRIPCION_CATEGORIA} </span>
          </div>
        </div>

        <div className="cardContainer">
          <IonList
            style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
          >
            <IonItem detail={false}>
              <IonLabel>
                {"Descripción: "} <br />
                <IonNote color="secondary" className="ion-text-wrap">
                  {detail?.CT_DESCRIPCION_INCIDENCIA}
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
            {imagesData.length > 0 ? (
              imagesData.map((image, index) => (
                <img
                  key={image.CT_ID_IMAGEN}
                  src={`http://localhost:3000${image.CT_IMAGEN}`}
                  alt={`Imagen ${image.CT_ID_IMAGEN}`}
                />
              ))
            ) : (
              <IonCardContent>
                No hay imagenes iniciales almacenadas
              </IonCardContent>
            )}
          </IonCard>
        </div>
        <div className="cardContainer">
          <IonCard className="cardInfo">
            <IonCardHeader>
              <IonCardTitle class="cardtitle">Imagenes finales</IonCardTitle>
            </IonCardHeader>
            {imagesData2.length > 0 ? (
              imagesData2.map((image, index) => (
                <img
                  key={image.CT_ID_IMAGEN}
                  src={`http://localhost:3000${image.CT_IMAGEN}`}
                  alt={`Imagen ${image.CT_ID_IMAGEN}`}
                />
              ))
            ) : (
              <IonCardContent>
                No hay imagenes finales almacenadas
              </IonCardContent>
            )}
          </IonCard>
        </div>
        <div className="cardContainer">
          {diagnosisData.map((data, index) => (
            <IonList
              key={index}
              style={{
                width: "100%",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <IonItem detail={false}>
                <IonLabel>
                  <IonNote color="secondary" className="ion-text-wrap">
                    {"Diagnostico #" + (index + 1)}
                  </IonNote>
                  <br />
                  <IonNote color="dark" className="ion-text-wrap">
                    {"Fecha: " + formatDateTime(data.CF_FECHA_HORA_DIAGNOSTICO)}
                  </IonNote>
                  <br />
                  <IonNote color="dark" className="ion-text-wrap">
                    {"Tiempo estimado: " +
                      data.CN_TIEMPO_SOLUCION_ESTIMADO +
                      "h"}
                  </IonNote>
                  <br />
                  <IonNote color="dark" className="ion-text-wrap">
                    {"Requiere compra: " + (data.CT_DIAGNOSTICO ? "Sí" : "No")}{" "}
                    <br />
                  </IonNote>
                  {"Diagnostico: " + data.CT_DIAGNOSTICO}
                  <br />
                  {"Observaciones: " + data.CT_OBSERVACIONES}
                </IonLabel>
              </IonItem>
            </IonList>
          ))}
        </div>

        {images.length > 0 && (
          <div className="imagesContainer">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Captured image ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className="cardContainer">
          <IonList
            style={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <IonItem detail={false}>
              <IonLabel>
                <IonNote color="secondary" className="ion-text-wrap">
                  {"Costo: "+detail?.CD_COSTO}
                </IonNote>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>

        <div className="bodyContainer">
          <h6>Agregar Costo</h6>
          <IonInput
            class="custom"
            name="CD_COSTO"
            value={cost.CD_COSTO}
            onIonInput={handleInputChange}
            required
            style={{ marginBottom: "20px", marginTop: "10px" }}
          />
        </div>

        <IonButton
          className="button2"
          onClick={() => {
            sendCost();
          }}
        >
          Guardar Costo
        </IonButton>
      </IonContent>
    </>
  );
}
