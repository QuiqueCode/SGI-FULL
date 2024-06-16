import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import "./TechnicianSupervisorStyle.css";
import { AsignableUserVM } from "../../viewModels/AsignableUserVM/AsignableUserVM";
import { useEffect } from "react";

export function TechnicianSupervisorList() {
  const { getUserList, asignableUser,goBack,techAsign  } = AsignableUserVM();

  useEffect(()=>{
    getUserList();
  },[])

  return (
    <IonContent fullscreen>
      <div className="backContainer">
        <p onClick={()=>{goBack()}}>ATRÁS</p>
      </div>
      <div className="titleContainerTech">
        <h1 style={{ color: "#C0C0C0" }}>Lista de Técnicos</h1>
      </div>

      {asignableUser.map((data, index) => (
        <IonList inset={true} key={index}>
          <IonItem detail={false}>
            <IonLabel>
              {"Técnico: "+ data.NOMBRE_COMPLETO}
              <br />

              <IonNote color="medium" className="ion-text-wrap">
                {"Carga de trabajo: " + (data.DURACION_TOTAL==null?0:data.DURACION_TOTAL)+"h"}
              </IonNote>
            </IonLabel>
            <IonButton className="asign" onClick={()=>{techAsign(data.CT_CEDULA_USUARIO_R)}} disabled={data.INCIDENCIA_ASIGNADA}>{data.INCIDENCIA_ASIGNADA?"Asignado":"Asignar"}</IonButton>
          </IonItem>
        </IonList>
      ))}
    </IonContent>
  );
}
