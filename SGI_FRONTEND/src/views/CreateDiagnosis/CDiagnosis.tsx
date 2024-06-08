import { IonButton, IonContent, IonInput, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import "./Diagnosis.css";
import { CDiagnosisMV } from "../../viewModels/createDiagnosisVM/CDiagnosisMV";

const CDiagnosis: React.FC = () => {
  const { formData, handleInputChange,handleSubmit,backToRolMenu, drophandleInput,changeValue }= CDiagnosisMV();

  return (
    <>
      <IonContent className="container">
        <div className="bodyContainer8">
          <p onClick={backToRolMenu} >ATRÁS</p>
        </div>
        <div className="contentContainer">
          <h1 style={{ color: "#C0C0C0" }}>Diagnóstico</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bodyContainer8">
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
        
         
              <IonToggle onIonChange={changeValue} style={{color:"white"}} color={"tertiary"} checked={formData.CB_REQUIERE_COMPRA}>Requiere compra</IonToggle>
          </div>

          <div className="bodyContainer8">
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
