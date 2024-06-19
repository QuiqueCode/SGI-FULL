import { returnUpBack } from "ionicons/icons"
import { useState } from "react";
import { useHistory } from "react-router"
import { BinnacleReportM } from "../../models/BinnacleReportM/BinnacleReportM";
import { GetBinnacleReport } from "../../services/BinnacleReportService/BinnacleReportService";


export const BinnacleReportVM=()=>{
    const history=useHistory();

    const [data,setData]=useState<BinnacleReportM[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e:any) => {
        setSearchTerm(e.target.value);
      };
      const filteredData = data.filter(incident =>
        incident.CT_CEDULA_USUARIO_R.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const getData= async()=>{
        const data = await GetBinnacleReport.fetchBinacle();
        setData(data)
    }
    const goBack=()=>{
        history.push("./reportSelector")
    }


    return{
        getData,
        data,
        goBack,
        filteredData,
        handleSearchChange,
        searchTerm


    }
}