import { useIonLoading } from "@ionic/react";
import { useState } from "react";
import { LoginModel } from "../assets/models/login.model";
import { LoginService } from "../services/LoginService";

export function LoginViewModel() {
  const [present, dismiss] = useIonLoading();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    } catch (error) {
      //setShowAlert(true);
      console.error("Error logging in:", error);
    } finally {
      //setShowLoad(false);
    }
  };
  return {
    present,
    formData,
    handleInputChange,
    handleSubmit,
  };
}
