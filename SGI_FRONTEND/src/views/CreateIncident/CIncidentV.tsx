import { IonButton, IonContent, IonInput } from "@ionic/react";
import './CIncidentStyle.css'
import { CIncidenciaViewModel } from "../../viewModels/createIncidentModel/CIncidentModel";


const CIncident: React.FC = () => {
const {formData,handleInputChange, handleSubmit, openCamera,images,cambiar}= CIncidenciaViewModel();


return(
    <>
    <IonContent className="container">
    <div className="bodyContainer">
          <p onClick={cambiar}>ATRÁS</p> 
        </div>
        <div className="contentContainer">
        <h1 style={{color:'#C0C0C0'}}>Registro de incidencia</h1>
        </div>
        
        <form onSubmit={handleSubmit} >
        <div className="bodyContainer">
        <h6>Título de incidencia</h6>  
              <IonInput
          class="custom"
          name="CT_TITULO_INCIDENCIA"
          value={formData.CT_TITULO_INCIDENCIA}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '20px', marginTop: '10px' }}
        />
              <h6>Descripción de incidencia</h6>  
              <IonInput
          class="custom"
          name="CT_DESCRIPCION_INCIDENCIA"
          value={formData.CT_DESCRIPCION_INCIDENCIA}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '20px', marginTop: '10px' }}
        />
              <h6>Lugar de la incidencia</h6>  
              <IonInput
          class="custom"
          name="CT_LUGAR_DE_INCIDENCIA"
          value={formData.CT_LUGAR_DE_INCIDENCIA}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '20px', marginTop: '10px' }}
        />
              <IonButton className="cameraButton" onClick={openCamera}>Agregar Imagenes</IonButton>
        </div>
        <div className="imagesContainer">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Captured image ${index + 1}`} />
        ))}
         </div>

        <div className="bodyContainer">
            <IonButton className="sendButton" type="submit">Registrar incidencia</IonButton>
        </div>
        </form>
          
        
       

    </IonContent>

    </>
);
}

export default CIncident;