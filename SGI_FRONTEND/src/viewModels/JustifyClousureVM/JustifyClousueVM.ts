import { useState } from "react";
import { JustifyClousureModel } from "../../models/JustifyClousureModel/JustifyClousureModel";
import { useIonLoading, useIonToast } from "@ionic/react";
import { CreateJustifyClousure } from "../../services/JustifyClousureService/JustifyClousureService";
import { useHistory } from "react-router";


export function JustifyClousureVM(){

    
  const [formData, setFormData] = useState({
    CT_JUSTIFICACION_CIERRE:'',
    CT_CODIGO_INCIDENCIA: localStorage.getItem("idIncident") || "",
  });
  const [present, dismiss] = useIonLoading();
  const [presentT] = useIonToast();
  const history=useHistory()

  const presentToast = () => {
    presentT({
      message: 'Justificación Almacenado!',
      duration: 2000,
      position: "middle",
      color:"success"
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name,value)
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const clousure: JustifyClousureModel = formData;
      await CreateJustifyClousure.createJustifyClousure(clousure);
      present({
        message: "Creando justifiación...",
        duration: 1000,
      }).then(() => {
        setTimeout(() => {
        presentToast();
          setFormData((prevState) => ({
            ...prevState,
            CT_JUSTIFICACION_CIERRE:'',
            CT_CODIGO_INCIDENCIA: localStorage.getItem("idIncident") || "",
          }));
        }, 1000); // Asegura que esto ocurra después de la duración de la alerta
      });
    } catch (error) {
      console.error("Error al almacenar justificacion:", error);
    }
  };

  const goBack=()=>{
    history.push("/managerDetail")
  }

  return{
    formData,
    handleInputChange,
    handleSubmit,
    goBack
  }
}