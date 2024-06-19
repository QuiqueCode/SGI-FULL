import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
} from "@ionic/react";
import React, { useEffect } from "react";
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <IonContent fullscreen>
      <div className="backContainer">
        <p onClick={goBack}>ATRÁS</p>
      </div>
      <div className="titleContainer">
        <h1 style={{ color: "#C0C0C0" }}>Reporte de trabajo</h1>
      </div>{" "}
      <br /> <br />
      <div className="bodyContainerBar">
        <IonSearchbar
          value={searchTerm}
          onIonChange={handleSearchChange}
          className="custom-searchbar"
          placeholder="2024-000001"
        ></IonSearchbar>{" "}
        <br />
      </div>
      {filteredData.map((data, index) => (
        <IonList inset={true}>
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
  );
}
