import { useState } from "react";
import { IncidentDiagnosisListM, IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { useHistory } from "react-router";
import { AffectationModel, CategoryModel, PriorityModel, RiskModel, StatuesModel } from "../../models/statuesModel/statuesmode";
import { FinalImagesModel, InitialImagesModel } from "../../models/initialImages/InitialImages";
import { GetStatueService } from "../../services/GetStatueService/getStatueService";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";
import { InitialImagesService } from "../../services/InitialImagesService/InitialImagesService";
import { DiagnosisIncidentListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";
import { SetAffectationModel, SetCategoryModel, SetPriorityModel, SetRiskModel, StatueModel } from "../../models/SetStatuesModel/SetSatuesModel";
import { SetStatueService } from "../../services/SetStatuesService/SetStatuesService";
import { DecodedToken } from "../../models/jwt/jwt.model";
import { jwtDecode } from "jwt-decode";


export const DetailIncidentSupervisorVM=()=>{
    const [detail,setDetail]=useState<IncidentTechnicianDetailM>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imagesData,setImagesData]=useState<InitialImagesModel[]>([]);
    const [imagesData2,setImagesData2]=useState<FinalImagesModel[]>([]);

    const [diagnosisData,setDiagnosis]=useState<IncidentDiagnosisListM[]>([]);;
    const history = useHistory();

    const [statue,setSatatues]=useState<StatuesModel[]>([]);
    const [risk,setRisk]=useState<RiskModel[]>([])
    const [affectation,setAffectation]=useState<AffectationModel[]>([]);
    const [category,setCategory]=useState<CategoryModel[]>([]);
    const [priority,setPriority]=useState<PriorityModel[]>([]);

    const data = localStorage.getItem('UserData') ?? '';
    const decodedToken = jwtDecode<DecodedToken>(data);
    let valueToken = decodedToken.idUsuario;
    

    //Statues
   
  

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
      const getPriority=async()=>{
        const data= await GetStatueService.fetchPriority();
        setPriority(data)
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
        const images= await InitialImagesService.fetchImages(0);
        const images2= await InitialImagesService.fetchImages(1);
        console.log(imagesData)
        setImagesData(images);
        setImagesData2(images2)
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
        history.push('/incidentManagerList')
      }

      //Handles
      const handleStatue= async(value:StatueModel)=>{
        const statue: StatueModel = value;
       
        try {
          await SetStatueService.setStatue(statue);
          console.log("Estado cambiado")
          setDetails();
        } catch (error) {
          console.log(error)
        }
      }

      const handleRisk= async(value:SetRiskModel)=>{
        const risk: SetRiskModel = value;
        try {
          await SetStatueService.setRisk(risk);
          console.log("Riesgo cambiado")
        } catch (error) {
          console.log(error)
        }
      }
      const handlePriority= async(value:SetPriorityModel)=>{
        const priority: SetPriorityModel = value;
        try {
          await SetStatueService.setPriority(priority);
          console.log("Prioridad cambiado")
        } catch (error) {
          console.log(error)
        }
      }
      
      const handleAffectation= async(value:SetAffectationModel)=>{
        const affectation: SetAffectationModel = value;
        try {
          await SetStatueService.setAffectation(affectation);
          console.log("Afectacion cambiada")
        } catch (error) {
          console.log(error)
        }
      }
      const handleCategory= async(value:SetCategoryModel)=>{
        const category: SetCategoryModel = value;
        try {
          await SetStatueService.setCategory(category);
          console.log("Categoría cambiada")
        } catch (error) {
          console.log(error)
        }
      }
      

const goToJustify=()=>{
  history.push('./justifyClousure')
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
        handleStatue,
        handleRisk,
        handleAffectation,
        handleCategory,
        goToJustify,
        imagesData2,
        valueToken,
        handlePriority,
        priority,setPriority,
        getPriority
     
        
    }


}