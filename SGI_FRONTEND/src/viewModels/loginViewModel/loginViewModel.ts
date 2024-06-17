import { useIonLoading, useIonToast } from "@ionic/react";
import { useState } from "react";
import { LoginModel } from "../../models/loginModel/login.model";
import { LoginService } from "../../services/LoginService/LoginService";
import { useHistory } from "react-router";

export function LoginViewModel() {
  const [present, dismiss] = useIonLoading();
  const [presentT] = useIonToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history =useHistory();

  const presentToast = () => {
    presentT({
      message: 'Usuario o contraseña incorrecto!',
      duration: 2000,
      position: "top",
      color:"danger"
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email= formData.email;
      const password=formData.password
      const user: LoginModel = { email, password };
      console.log("user: ", user);
      await LoginService.login(user);
      present({
        message: "Iniciando sesion...",
        duration: 1500,
      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirecciona a la página CIncident
      history.push('/RolSelector');
  
      
    } catch (error) {
      presentToast();
      //setShowAlert(true);
      console.error("Error logging in:", error);
    } 
  };
  return {
    present,
    formData,
    handleInputChange,
    handleSubmit,
  };
}
