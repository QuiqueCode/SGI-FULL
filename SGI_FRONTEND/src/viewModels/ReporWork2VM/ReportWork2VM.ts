import { useState } from "react";
import { useHistory } from "react-router"
import { WorkReportModel2 } from "../../models/WorkReportModel2/WorkReportModel2";
import { WorkReportService2 } from "../../services/WorkReport2Service/WorkReport2Service";


export const ReportWork2VM=()=>{
    const history=useHistory();
    const [data,setData]=useState<WorkReportModel2[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const estados=["REGISTRADO","ASIGNADO","EN REVISIÓN","EN REPARACIÓN","PENDIENTE DE COMPRA","CONTRATACIÓN EXTERNA","TERMINADO","APROBADO","RECHAZADO","CERRADO"];
    const categoria=["REPARACIÓN","INTERVENCIÓN NATURAL","ATENCIÓN AL MOBILIARIO"];

    const handleSearchChange = (e:any) => {
        setSearchTerm(e.target.value);
      };
      const filteredData = data.filter(data =>
        data.CT_CODIGO_INCIDENCIA.toLowerCase().includes(searchTerm.toLowerCase())
      );


    const goBack=()=>{
        history.push('./reportSelector')
    }
    const getData=async()=>{
        const values=await WorkReportService2.getWorkReport2();
        setData(values)
    }


    return{
        getData,
        goBack,
        handleSearchChange,
        filteredData,
        searchTerm,
        estados,
        categoria

    }
}