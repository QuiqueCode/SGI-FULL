import { IonButton, IonContent, IonInput } from "@ionic/react";
import React from "react";
import { JustifyClousureVM } from "../../viewModels/JustifyClousureVM/JustifyClousueVM";

export default function JustifyClousure() {
  const { formData, handleInputChange, handleSubmit,goBack } = JustifyClousureVM();
  return (
    <IonContent className="container">
      <div className="bodyContainer8">
        <p onClick={()=>{goBack()}}>ATRÁS</p>
      </div>
      <div className="contentContainer">
        <h1 style={{ color: "#C0C0C0" }}>Justificación de cierre</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bodyContainer8">
          <h6>Justificación</h6>
          <IonInput
            class="custom"
            name="CT_JUSTIFICACION_CIERRE"
            value={formData.CT_JUSTIFICACION_CIERRE}
            onIonInput={handleInputChange}
            required
            style={{ marginBottom: "20px", marginTop: "10px" }}
          />
        </div>

        <div className="bodyContainer8">
          <IonButton className="sendButton" type="submit">
            Registrar justificación
          </IonButton>
        </div>
      </form>
    </IonContent>
  );
}
