import { useHistory } from "react-router"



export const RolSelectorActions=()=>{
    const history=useHistory();


    const backToLogin=()=>{
        history.push("/login");
        localStorage.clear();
    }
    const goToUser=()=>{
        history.push('/Cincident')
    }
    const goToTech=()=>{
        history.push('/IncidetnTechL')
    }

    return{
        backToLogin,
        goToUser,
        goToTech
    }
}