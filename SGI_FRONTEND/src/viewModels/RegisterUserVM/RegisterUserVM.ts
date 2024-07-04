import { useState } from "react";
import { useHistory } from "react-router";
import { CreateUserModel } from "../../models/CreateUserModel/CreateUserModel";
import { DepartamentModel } from "../../models/DepartamentModel/DepartamentModel";
import { GetDepartament } from "../../services/DepartamentService/DepartamentService";
import { AsignRolVM } from "../AsignRolVM/AsignRolVM";
import { CreateUserService } from "../../services/CreateUserService/CreateUserService";
import { useIonLoading, useIonToast } from "@ionic/react";

export const RegisterUserVM = () => {
  const roles = [];
  const { getRoles } = AsignRolVM();
  const [presentT] = useIonToast();
  const [present, dismiss] = useIonLoading();
  const [department, setDepartment] = useState<DepartamentModel[]>([]);
  const [formData, setFormData] = useState<CreateUserModel>({
    CT_CEDULA: "",
    CT_NOMBRE: "",
    CT_APELLIDO_UNO: "",
    CT_APELLIDO_DOS: "",
    CN_TELEFONO: "",
    CT_CORREO: "",
    CT_PUESTO: "",
    CN_DEPARTAMENTO: 0,
    CB_ESTADO: true, 
    CT_CONTRASENA: "",
    ROLES: [],
  });

  const presentToast = () => {
    presentT({
      message: "Usuario Creado!",
      duration: 2000,
      position: "middle",
      color: "success",
    });
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

  const getRol = () => {
    getRoles();
  };

  const [state, setState] = useState(true);
  const changeState = () => {
    setState(!state);
  };
  const history = useHistory();

  const goBack = () => {
    history.push("/adminView");
  };
  const goRol = () => {
    history.push("/userAsign");
  };

  const getDepartament = async () => {
    const data = await GetDepartament.fetchDepartment();
    setDepartment(data);
  };

  const setRol = (id: number) => {
    formData.ROLES.push(id);
    console.log(formData);
    getRol();
  };

  const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formData)
  
    try {
      const userData = formData;
      await CreateUserService.createUser(userData);
      present({
        message: "Creando Usuario...",
        duration: 1000,
      }).then(() => {
        setTimeout(() => {
          presentToast();
          setFormData((prevState) => ({
            ...prevState,
            CT_CEDULA: "",
            CT_NOMBRE: "",
            CT_APELLIDO_UNO: "",
            CT_APELLIDO_DOS: "",
            CN_TELEFONO: "",
            CT_CORREO: "",
            CT_PUESTO: "",
            CN_DEPARTAMENTO: 0,
            CB_ESTADO: true, 
            CT_CONTRASENA: "",
            ROLES: [],
          }));
        }, 1000); 
      });
    } catch (error) {
      console.error("Error creando la incidencia:", error);
  
    }
}

  return {
    goBack,
    goRol,
    changeState,
    state,
    handleInputChange,
    formData,
    getDepartament,
    department,
    setRol,
    handleSubmit,
  };
};
