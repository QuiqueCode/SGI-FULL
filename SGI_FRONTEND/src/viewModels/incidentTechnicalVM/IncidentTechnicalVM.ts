import { useHistory } from "react-router"


export const IncidentTechnicalVM=()=>{
    const history=useHistory();

    const moveToDiagnostic=()=>{

        history.push("/diagnostic")
    }

    const moveToList=()=>{
        history.push("/IncidetnTechL")
    }

    return{
        moveToDiagnostic,
        moveToList

    }
}