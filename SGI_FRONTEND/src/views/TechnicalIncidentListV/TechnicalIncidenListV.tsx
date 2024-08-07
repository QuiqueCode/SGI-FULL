import { useEffect, useState } from "react";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
} from "@ionic/react";
import "./TechnicalIncidentListStyle.css";
import { IonSearchbar } from "@ionic/react";
import {
  IncidentTechnicalVM,
  getIncidentTechnicianDataList,
} from "../../viewModels/incidentTechnicalVM/IncidentTechnicalVM";

const TechnicalIncidentList: React.FC = () => {
  const {
    data,
    setData,
    setLoading,
    setError,
    loading,
    error,
    backToMenu,
    goToDetail,
    getData,
    handleSearchChange,
    filteredData,
    searchTerm,
  } = IncidentTechnicalVM();
  

  useEffect(() => {
    const loadData=async()=>{
      await Promise.all([
        getData()
      ])
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
      <p onClick={backToMenu}>ATRÁS</p>
    </div>
    <div className="titleContainer">
      <h1 style={{ color: "#C0C0C0" }}>Lista de incidencias</h1>
    </div><br /><br />

    <div className="bodyContainer">
      <IonSearchbar
        value={searchTerm}
        onIonChange={handleSearchChange}
        className="custom-searchbar"
        style={{ width: "100%" }}
        placeholder="2024-00001"
      ></IonSearchbar>{" "}
      <br />
      {filteredData.map((incident, index) => (
        <IonCard style={{ width: "100%" }} key={index}>
          <img
             src={`http://localhost:3000${incident.IMAGEN}`}
            alt={`Imagen ${incident.IMAGEN}`}
          />
          <IonCardHeader>
            <IonCardSubtitle>
              {"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {" "}
            {incident.CT_DESCRIPCION_INCIDENCIA} <br />
            Estado:{" "}
            <IonNote color={"danger"}>
              {" "}
              {incident.CT_DESCRIPCION_ESTADO}
            </IonNote>
            <br />
            <br />
            <IonButton
              slot="end"
              className="inButton"
              onClick={() => {
                goToDetail(incident.CT_CODIGO_INCIDENCIA);
              }}
            >
              {" "}
              Ingresar
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  </IonContent>
)}

</>
  
  
  );
};

export default TechnicalIncidentList;
