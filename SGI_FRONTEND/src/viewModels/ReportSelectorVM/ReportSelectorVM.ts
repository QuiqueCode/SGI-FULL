import { useHistory } from "react-router"

export const ReportSelector=()=>{
    const history=useHistory();
    const goBack=()=>{
        history.push('/incidentManagerList')
    }
    const goToWorkReport=()=>{
        history.push('/workReport')
    }

    return{
        goBack,
        goToWorkReport
    }
}