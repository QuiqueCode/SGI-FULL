import { IonButton, IonContent, IonInput } from "@ionic/react";
import "./Diagnosis.css";
import { CDiagnosisMV } from "../../viewModels/createDiagnosisVM/CDiagnosisMV";

const CDiagnosis: React.FC = () => {
  const { formData, handleInputChange,handleSubmit }= CDiagnosisMV();;

  return (
    <>
      <IonContent className="container">
        <div className="bodyContainer">
          <p>ATRÁS</p>
        </div>
        <div className="contentContainer">
          <h1 style={{ color: "#C0C0C0" }}>Diagnóstico</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bodyContainer">
            <h6>Diagnóstico</h6>
            <IonInput
              class="custom"
              name="CT_DIAGNOSTICO"
              value={formData.CT_DIAGNOSTICO}
              onIonInput={handleInputChange}
              required
              style={{ marginBottom: "20px", marginTop: "10px" }}
            />
            <h6>Observaciones</h6>
            <IonInput
              class="custom"
              name="CT_OBSERVACIONES"
              value={formData.CT_OBSERVACIONES}
              onIonInput={handleInputChange}
              required
              style={{ marginBottom: "20px", marginTop: "10px" }}
            />
            <h6>Tiempo estimado</h6>

            <IonInput
              class="custom"
              name="CN_TIEMPO_SOLUCION_ESTIMADO"
              value={formData.CN_TIEMPO_SOLUCION_ESTIMADO}
              onIonInput={handleInputChange}
              required
              style={{ marginBottom: "20px", marginTop: "10px" }}
            />
          </div>

          <div className="bodyContainer">
            <IonButton className="sendButton" type="submit">
              Registrar diagnostico
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
};

export default CDiagnosis;
