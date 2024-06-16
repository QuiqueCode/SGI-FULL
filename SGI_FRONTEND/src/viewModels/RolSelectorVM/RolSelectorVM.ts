import { useHistory } from "react-router"



export const RolSelectorActions=()=>{
    const history=useHistory();


    const backToLogin=()=>{
        history.push("/login");
        localStorage.clear();
    }
    const goToUser=()=>{
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

    return{
        backToLogin,
        goToUser,
        goToTech,
        goToManager,
        goToSupervisor
    }
}