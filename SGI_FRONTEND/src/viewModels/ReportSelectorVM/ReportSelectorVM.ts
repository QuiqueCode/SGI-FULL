import { useHistory } from "react-router"

export const ReportSelector=()=>{
    const history=useHistory();
    const goBack=()=>{
        history.push('/incidentManagerList')
    }
    const goToWorkReport=()=>{
        history.push('/workReport')
    }
    const goToWorkReport2=()=>{
        history.push('/workReport2')
    }
    const goToBinnacleReport=()=>{
        history.push('/binnacleReport')
    }

    return{
        goBack,
        goToWorkReport,
        goToBinnacleReport,
        goToWorkReport2
    }
}