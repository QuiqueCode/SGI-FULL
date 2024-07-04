import { useState } from "react"
import { WorkReportService } from "../../services/WorkReportService/WorkReportService"
import { useHistory } from "react-router"


export const WorkReportVM=()=>{
    const [data,setData]=useState<WorkReportModel[]>([])
    const history=useHistory()
    const category=["REPARACION","INTERVENCIÓN NATURAL","ATENCIÓN AL MOBILIDARIO"]
    const getInfo=async()=>{
        const workData=await WorkReportService.getWorkReport();
        setData(workData);
        getValue()
    }
    const getValue=()=>{
        console.log(data)
    }
    const goBack=()=>{
        //Volver al menu
        history.push('/reportSelector')
    }

return{
    getInfo,
    data,
    category,
    goBack
}
}