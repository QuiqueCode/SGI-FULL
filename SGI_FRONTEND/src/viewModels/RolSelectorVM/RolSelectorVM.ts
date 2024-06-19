import { useState } from "react";
import { useHistory } from "react-router"
import { DecodedToken } from "../../models/jwt/jwt.model";
import { jwtDecode } from "jwt-decode";



export const RolSelectorActions=()=>{
    const history=useHistory();


    const backToLogin=()=>{
        history.push("/login");
        localStorage.clear();
    }
    const goToAdmin=()=>{
        history.push('/adminView')
    }
    const goToUser=()=>{
        const dataUser = localStorage.getItem('UserData') ?? '';
        const decodedToken = jwtDecode<DecodedToken>(dataUser);
        let valueToken = decodedToken;
        console.log(valueToken)
        history.push('/UserIncidentL')
    }
    const goToTech=()=>{
        history.push('/TechIncidentsList')
    }
    const goToManager=()=>{
        history.push('/incidentManagerList')
    }
    const goToSupervisor=()=>{
        history.push('/SupervisorCloseList')
    }
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
 
  
    const handleButtonClick = (action:any) => {
      setProgress(0);
      setIsLoading(true);
      setTimeout(() => {
        action();
        setIsLoading(false);
      }, 1000);
    };
  
    const handleAction = () => {
      console.log('Acción ejecutada!');
      // Aquí puedes poner la acción que quieres ejecutar al finalizar la carga
    };
  
    return{
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
        goToAdmin
        
    }
}