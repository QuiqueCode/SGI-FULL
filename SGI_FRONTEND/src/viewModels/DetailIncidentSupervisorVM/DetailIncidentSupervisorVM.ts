import { useState } from "react";
import { IncidentDiagnosisListM, IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { useHistory } from "react-router";
import { AffectationModel, CategoryModel, RiskModel, StatuesModel } from "../../models/statuesModel/statuesmode";
import { InitialImagesModel } from "../../models/initialImages/InitialImages";
import { GetStatueService } from "../../services/GetStatueService/getStatueService";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";
import { InitialImagesService } from "../../services/InitialImagesService/InitialImagesService";
import { DiagnosisIncidentListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";


export const DetailIncidentSupervisorVM=()=>{
    const [detail,setDetail]=useState<IncidentTechnicianDetailM>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imagesData,setImagesData]=useState<InitialImagesModel[]>([]);
    const [diagnosisData,setDiagnosis]=useState<IncidentDiagnosisListM[]>([]);;
    const history = useHistory();

    const [statue,setSatatues]=useState<StatuesModel[]>([]);
    const [risk,setRisk]=useState<RiskModel[]>([])
    const [affectation,setAffectation]=useState<AffectationModel[]>([]);
    const [category,setCategory]=useState<CategoryModel[]>([]);

    const getStatues=async()=>{
        const data= await GetStatueService.fetchStatues();
        setSatatues(data)
      }
      const getRisk=async()=>{
        const data= await GetStatueService.fetchRisk();
        setRisk(data)
      }
      const getAffectation=async()=>{
        const data= await GetStatueService.fetchAffectation();
        setAffectation(data)
      }
      const getCategory=async()=>{
        const data= await GetStatueService.fetchCategory();
        setCategory(data)
      }
      const goToAsign=async()=>{
        history.push("./techAsignL")
      }
      
      function formatDateTime(isoString:string) {
        // Crear un objeto Date a partir de la cadena ISO
        const date = new Date(isoString);
      
        // Obtener los componentes de la fecha y hora
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses van de 0 a 11
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Formatear los componentes para que tengan siempre dos dígitos
        const formattedDay = day.toString();
        const formattedMonth = month.toString();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        // Construir la cadena final
        return `${formattedDay} / ${formattedMonth} / ${year} - ${formattedHours}:${formattedMinutes}`;
      }
    
      const setDetails=async()=>{
        try {
          const dataDetails= await IncidentTechnicianDetailService.viewTechnicianIncidentDetail();
          setDetail(dataDetails)
          console.log(detail)
        } catch (error) {
          console.log(error)
        }
      }
      const chargeImages=async()=>{
        const images= await InitialImagesService.fetchImages();
        setImagesData(images);
      }
      const sendDiagnosis= async()=>{
        try {
          const diagnosis=await DiagnosisIncidentListService.fetchDiagnosis();
          setDiagnosis(diagnosis);
          console.log(diagnosisData)
        } catch (error) {
          
        }
      }
      const backToSupervisorList=()=>{
        history.push('/incidentSupervisorList')
      }
   

    return{
        setDetails,
        getStatues,
        getAffectation,
        getRisk,
        getCategory,
        formatDateTime,
        statue,
        risk,
        category,
        affectation,
        detail,
        chargeImages,
        imagesData,
        loading, 
        setLoading,
        error, 
        setError,
        sendDiagnosis,
        diagnosisData,
        backToSupervisorList,
        goToAsign,
     
        
    }


}