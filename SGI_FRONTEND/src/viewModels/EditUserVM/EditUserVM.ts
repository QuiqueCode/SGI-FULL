import { useState } from "react";
import { GetDataUserModel } from "../../models/GetDataUserModel/GetDataUserModel";
import { GetDataUserService } from "../../services/GetDataUserService/GetDataUserService";
import { CreateUserModel, EditUserModel } from "../../models/CreateUserModel/CreateUserModel";
import { DepartamentModel } from "../../models/DepartamentModel/DepartamentModel";
import { GetDepartament } from "../../services/DepartamentService/DepartamentService";
import { GetRolesModel } from "../../models/GetRolesModel/GetRolesModel";
import { GetRolesService } from "../../services/GetRolesService/GetRolesService";
import { useIonLoading, useIonToast } from "@ionic/react";
import { editUserService } from "../../services/EditUserService/EditUserService";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../models/jwt/jwt.model";
import { useHistory } from "react-router";

export const editUserVM=()=>{
   const CEDULA=localStorage.getItem('usrInfo');
   const data = localStorage.getItem('UserData') ?? '';
const decodedToken = jwtDecode<DecodedToken>(data);
 let valueToken = decodedToken.idUsuario;

 const history=useHistory();
    const [state, setState] = useState(true);
    const [dataUser,setDataUser]=useState<GetDataUserModel>();
    const [presentT] = useIonToast();
    const [present, dismiss] = useIonLoading();
    const [roles,setRoles]=useState<GetRolesModel[]>([])
    const [department, setDepartment] = useState<DepartamentModel[]>([]);
    const [formData, setFormData] = useState<EditUserModel>({
      CT_NOMBRE: "",
      CT_APELLIDO_UNO: "",
      CT_APELLIDO_DOS: "",
      CN_TELEFONO: "",
      CT_CORREO: "",
      CT_PUESTO: "",
      CN_DEPARTAMENTO: 0,
      CB_ESTADO: true, // Asumimos que el usuario está activo por defecto
      CT_CONTRASENA: "",
      ROLES: [],
    });

    const goBack=()=>{
      history.push('/usrAdminV')
    }
    const sendDataUser= async()=>{
      const data= await GetDataUserService.fetchUser();
      setFormData((prevState) => ({
        ...prevState,
        CT_NOMBRE: data.CT_NOMBRE,
        CT_APELLIDO_UNO: data.CT_APELLIDO_UNO,
        CT_APELLIDO_DOS: data.CT_APELLIDO_DOS,
        CN_TELEFONO: data.CT_APELLIDO_DOS,
        CT_CORREO: data.CT_CORREO,
        CT_PUESTO: data.CT_PUESTO,
        CN_DEPARTAMENTO: data.CN_DEPARTAMENTO,
        CB_ESTADO: data.CB_ESTADO, // Asumimos que el usuario está activo por defecto
        CT_CONTRASENA: data.CT_CONTRASENA,
        ROLES: data.ROLES,
      }));
 
      setDataUser(data);
      console.log(dataUser)
    }
    
    const changeState = () => {
      setState(!state);
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
    const getDepartament = async () => {
      const data = await GetDepartament.fetchDepartment();
      setDepartment(data);
    };
    const getRoles=async()=>{
      const data=await GetRolesService.fetchRoles();
      setRoles(data)
     }
     const setRol = (id: number) => {
      if (formData.ROLES.includes(id)) {
        const index=formData.ROLES.indexOf(id);
        formData.ROLES.splice(index, 1);
        console.log(formData)
        getRoles();
      }else{
        formData.ROLES.push(id);
        console.log(formData);
        getRoles();
      }
    
    };

    const presentToast = () => {
      
      if (CEDULA==valueToken) {
        presentT({
          message: "Información almacenada - SE REQUIERE INICIO DE SESIÓN!",
          duration: 2000,
          position: "middle",
          color: "success",
        }).then(() => {
         history.push('/login')
        });
      }else{
        presentT({
          message: "Información almacenada!",
          duration: 2000,
          position: "middle",
          color: "success",
        })  
      }
   
    
    };
    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log(formData)
    
      try {
        await editUserService.updateUser(formData)
        present({
          message: "Almacenando información...",
          duration: 1000,
        }).then(() => {
          setTimeout(() => {
            presentToast();
          }, 1000); // Asegura que esto ocurra después de la duración de la alerta
        });
      } catch (error) {
        console.error("Error creando la incidencia:", error);
        // Manejo de errores
      }
  }
  
 
return{
state,changeState, sendDataUser, formData,
handleInputChange,getDepartament,department,getRoles,roles,setRol,handleSubmit,goBack
}
}