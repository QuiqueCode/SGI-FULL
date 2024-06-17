import { IonButton, IonContent, IonIcon, IonProgressBar } from "@ionic/react";
import "./RolSelectorStyle.css";
import { arrowBack } from "ionicons/icons";
import { RolSelectorActions } from "../../viewModels/RolSelectorVM/RolSelectorVM";
import { useEffect, useState } from "react";

export const RolSelector = () => {
  //Recordar el IONCONTENT EN CASO DE ERORRES DE VISUALIZACION
  const {
    backToLogin,
    goToUser,
    goToTech,
    goToManager,
    goToSupervisor,
    handleButtonClick,
    progress,
    isLoading,
    handleAction,
    setProgress,
    setIsLoading,
  } = RolSelectorActions();

  useEffect(() => {
    if (isLoading) {
      const duration = 1000; // Duración total en milisegundos (2 segundos)
      const intervalTime = 10; // Intervalo de tiempo en milisegundos
      const increment = intervalTime / duration; // Incremento en cada paso

      const interval = setInterval(() => {
        setProgress((prevProgress: any) => {
          if (prevProgress >= 1) {
            clearInterval(interval);
            setIsLoading(false);
            handleAction(); // Ejecutar la acción al llegar al final
            return 1;
          }
          return prevProgress + increment;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isLoading]);
  return (
    <>
      {isLoading && <IonProgressBar value={progress}></IonProgressBar>}
      <div className="backContainer">
        <IonIcon
          icon={arrowBack}
          className="icon"
          onClick={backToLogin}
        ></IonIcon>
      </div>
      <div className="bodyContainer2">
        <IonButton
          className="rolSelector"
          onClick={() => handleButtonClick(goToUser)}
        >
          Usuario
        </IonButton>
        <IonButton
          className="rolSelector"
          onClick={() => handleButtonClick(goToManager)}
        >
          Encargado
        </IonButton>
        <IonButton
          className="rolSelector"
          onClick={() => handleButtonClick(goToTech)}
        >
          Técnico
        </IonButton>
        <IonButton
          className="rolSelector"
          onClick={() => handleButtonClick(goToSupervisor)}
        >
          Supervisor
        </IonButton>
        <IonButton className="rolSelector">Administrador</IonButton>
      </div>
    </>
  );
};
