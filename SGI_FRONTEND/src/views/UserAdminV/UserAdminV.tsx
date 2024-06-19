import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { userAdminVM } from "../../viewModels/UserAdminVM/UserAdminVM";
import "./UserAdminStyle.css";

export default function UserAdminV() {
  const { getUsers, users, supendUser,   handleSearchChange,
    searchTerm,
    filteredData, goToBack, goToEdit } = userAdminVM();

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <IonContent fullscreen>
      <div className="backContainer">
        <p onClick={goToBack}>ATRÁS</p>
      </div>
      <div className="titleContainer">
        <h1 style={{ color: "#C0C0C0" }}>Lista de usuarios</h1>
      </div> <br />
      <div className="bodyContainerBar">
        <IonSearchbar
          value={searchTerm}
          onIonChange={handleSearchChange}
          className="custom-searchbar"
          placeholder="702880922"
        ></IonSearchbar>{" "}
       
      </div>
      {filteredData.map((data, index) => (
        <IonCard>
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
  );
}
