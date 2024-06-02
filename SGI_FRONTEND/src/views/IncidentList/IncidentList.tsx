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
} from "@ionic/react";
import "./IncidentListStyle.css";
import { IonSearchbar } from '@ionic/react';
import { IncidentListMV, getIncidentDataList } from "../../viewModels/incidentListVM/incidentListMV";

const IncidentList: React.FC = () => {
const { data,setData,setLoading,setError,loading,error}=IncidentListMV();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getIncidentDataList();
        setData(result);
        setError(null); // Reset error if successful
      } catch (error) {
        console.error("Error al obtener incidencias:", error);
        setError("Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <IonContent fullscreen>
           <div className="backContainer">
          <p>ATRÁS</p> 
        </div>
        <div className="titleContainer">
        <h1 style={{color:'#C0C0C0'}}>Lista de incidencia</h1>
        </div>
<div className="reportContainer">
<IonButton className="reportButton">Reportes</IonButton> <br />
</div>
   
      <div className="bodyContainer">

      <IonSearchbar className="custom-searchbar" placeholder="2024-00001"></IonSearchbar> <br />
        {data.map((incident) => (
         
            <IonCard key={incident.CT_CODIGO_INCIDENCIA} className="card">
              <IonCardHeader>
                <IonCardTitle className="title">
                  {"Incidencia: " + incident.CT_CODIGO_INCIDENCIA}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {incident.CT_DESCRIPCION_INCIDENCIA}
              </IonCardContent>
              <div className="button-container">
            <IonButton className="inButton">Ingresar</IonButton>
          </div>
            </IonCard>
         
        ))}
      </div>
    </IonContent>
  );
};

export default IncidentList;