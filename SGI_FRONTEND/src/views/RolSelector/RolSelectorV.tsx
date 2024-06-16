import { IonButton, IonContent, IonIcon } from "@ionic/react";
import './RolSelectorStyle.css'
import { arrowBack } from 'ionicons/icons';
import { RolSelectorActions } from "../../viewModels/RolSelectorVM/RolSelectorVM";

export const RolSelector=()=>{
//Recordar el IONCONTENT EN CASO DE ERORRES DE VISUALIZACION
const {backToLogin,goToUser,goToTech,goToManager,goToSupervisor}=RolSelectorActions();

    return(
        <>
   
       <div className="backContainer">
<IonIcon icon={arrowBack} className="icon" onClick={backToLogin}></IonIcon>
        </div>
      <div className="bodyContainer2">
       
        <IonButton className="rolSelector" onClick={goToUser}>Usuario</IonButton> 
        <IonButton className="rolSelector" onClick={goToManager}>Encargado</IonButton> 
        <IonButton className="rolSelector" onClick={goToTech}>Técnico</IonButton> 
        <IonButton className="rolSelector" onClick={goToSupervisor}>Supervisor</IonButton> 
        <IonButton className="rolSelector">Administrador</IonButton> 
       
      </div>
   
      </>
    );
}