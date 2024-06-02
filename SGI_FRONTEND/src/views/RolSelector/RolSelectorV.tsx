import { IonButton, IonContent, IonIcon } from "@ionic/react";
import './RolSelectorStyle.css'
import { arrowBack } from 'ionicons/icons';

export const RolSelector=()=>{
//Recordar el IONCONTENT EN CASO DE ERORRES DE VISUALIZACION

    return(
        <>
   
       <div className="backContainer">
<IonIcon icon={arrowBack} className="icon"></IonIcon>
        </div>
      <div className="bodyContainer">
       
        <IonButton className="reportButton">Usuario</IonButton> 
        <IonButton className="reportButton">Encargado</IonButton> 
        <IonButton className="reportButton">Técnico</IonButton> 
        <IonButton className="reportButton">Supervisor</IonButton> 
        <IonButton className="reportButton">Administrador</IonButton> 
       
      </div>
   
      </>
    );
}