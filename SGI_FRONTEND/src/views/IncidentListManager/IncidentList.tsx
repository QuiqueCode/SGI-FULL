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
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  IonThumbnail,
  IonList,
  IonSpinner,
} from "@ionic/react";
import "./IncidentListStyle.css";
import { IonSearchbar } from "@ionic/react";
import {
  IncidentListMV,
  getIncidentDataList,
} from "../../viewModels/incidentListVM/incidentListMV";
import { chevronForward } from "ionicons/icons";

const IncidentList: React.FC = () => {
  const {
    data,
    setData,
    setLoading,
    setError,
    loading,
    error,
    backToMenu,
    fetchData,
    goToDetail,
    goToReport,
    searchTerm,
    handleSearchChange,
    filteredData,
  } = IncidentListMV();

  useEffect(() => {
    const loadData=async()=>{
     await Promise.all([
        fetchData()
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
        <h1 style={{ color: "#C0C0C0" }}>Lista de incidencia</h1>
      </div>
      <div className="reportContainer">
        <IonButton
          className="reportButton"
          onClick={() => {
            goToReport();
          }}
        >
          Reportes
        </IonButton>{" "}
        <br />
      </div>

      <div     style={{ marginLeft: "16px", marginRight: "16px" }}>
     <IonSearchbar
          value={searchTerm}
          onIonChange={handleSearchChange}
          className="custom-searchbar"
          placeholder="702880922"
      
        ></IonSearchbar>{" "}

     </div> <br />
      {filteredData.map((incident,index) => (
        <IonList inset={true} key={index}>
          <IonItem detail={false}>
            <IonLabel>
              {"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}
              <br />

              <IonNote color="medium" className="ion-text-wrap">
                {"Descripción: " + incident.CT_DESCRIPCION_INCIDENCIA}
              </IonNote>
            </IonLabel>
            <IonButton
              className="inItem"
              onClick={() => {
                goToDetail(incident.CT_CODIGO_INCIDENCIA);
              }}
            >
              Ingresar
            </IonButton>
          </IonItem>
        </IonList>
      ))}
    </IonContent>
    )}
    </>
    
  );
};

export default IncidentList;
