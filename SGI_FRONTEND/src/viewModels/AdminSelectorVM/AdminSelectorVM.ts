import { useHistory } from "react-router"


export const AdminSelectorVM=()=>{
    const history=useHistory();

    const goBack=()=>{
        history.push('/RolSelector')
    }

    const goCreateUser=()=>{
        history.push('/registerUserV')
    }
    const goToRol=()=>{
        history.push('/rolAdministration')
    }
    const goToUserList=()=>{
        history.push('/usrAdminV')
    }
    return{
        goBack,
        goCreateUser,
        goToRol,
        goToUserList
    }
}