import { useState } from "react";
import { CreateDiagnosisService } from "../../services/CreateDiagnosisService/CDiagnosisService";
import { CreateDiagnosisModel } from "../../models/createDiagnosisModel/createDiagnosis.model";
import { DecodedToken } from "../../models/jwt/jwt.model";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router";
import { useIonLoading, useIonToast } from "@ionic/react";

export function CDiagnosisMV() {
  const [presentT] = useIonToast();
  const [present, dismiss] = useIonLoading();
  const data = localStorage.getItem("UserData") ?? "";
  const decodedToken = jwtDecode<DecodedToken>(data);
  let valueToken = decodedToken.idUsuario;
  const history = useHistory();

  const presentToast = () => {
    presentT({
      message: 'Diagnostico Almacenado!',
      duration: 2000,
      position: "middle",
      color:"success"
    });
  };

  const [formData, setFormData] = useState({
    CT_ID_INCIDENCIA: localStorage.getItem("idIncident") || "",
    CN_TIEMPO_SOLUCION_ESTIMADO: 0,
    CT_DIAGNOSTICO: "",
    CT_OBSERVACIONES: "",
    CT_TECNICO: valueToken,
    CB_REQUIERE_COMPRA: false,
  });

  const backToRolMenu = () => {
    history.push("/TechIncidentDetail");
    console.log(history);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
    console.log(formData);
  };

  const drophandleInput = (value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      CB_REQUIERE_COMPRA: value,
    }));
    console.log(formData);
  };
const changeValue=()=>{
  setFormData((prevState) => ({
    ...prevState,
    CB_REQUIERE_COMPRA: !formData.CB_REQUIERE_COMPRA,
  }));
  console.log(formData)
}
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const diagnosis: CreateDiagnosisModel = formData;
      await CreateDiagnosisService.createDiagnosis(diagnosis);
      present({
        message: "Creando diagnostico...",
        duration: 1000,
      }).then(() => {
        setTimeout(() => {
        presentToast();
          setFormData((prevState) => ({
            ...prevState,
            CN_TIEMPO_SOLUCION_ESTIMADO: 0,
            CT_DIAGNOSTICO: "",
            CT_OBSERVACIONES: "",
            CT_TECNICO: valueToken,
            CB_REQUIERE_COMPRA: false,
          }));
        }, 1000); 
      });
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    backToRolMenu,
    drophandleInput,
    changeValue
  };
}
