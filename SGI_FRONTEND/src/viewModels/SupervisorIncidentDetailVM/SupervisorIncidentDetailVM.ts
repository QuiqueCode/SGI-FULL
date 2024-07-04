import { useIonLoading, useIonToast } from "@ionic/react";
import { useState } from "react";
import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";
import { IncidentDiagnosisListM, IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { StatuesModel } from "../../models/statuesModel/statuesmode";
import { FinalImagesModel, InitialImagesModel } from "../../models/initialImages/InitialImages";
import { useHistory } from "react-router";
import { GetStatueService } from "../../services/GetStatueService/getStatueService";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";
import { InitialImagesService } from "../../services/InitialImagesService/InitialImagesService";
import { StatueModel } from "../../models/SetStatuesModel/SetSatuesModel";
import { SetStatueService } from "../../services/SetStatuesService/SetStatuesService";
import { DiagnosisIncidentListService, IncidentTechnicianListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";
import { CostModel } from "../../models/CostModel/CostModel";
import { send, sync } from "ionicons/icons";
import { CostService } from "../../services/CostService/CostService";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../models/jwt/jwt.model";

export const SuperVisorDetailVM = () => {
    const [presentT] = useIonToast();
    const [data, setData] = useState<IncidentTechnicianListModel[]>([]);
    const [detail,setDetail]=useState<IncidentTechnicianDetailM>();
    const [statue,setSatatues]=useState<StatuesModel[]>([])
    const [diagnosisData,setDiagnosis]=useState<IncidentDiagnosisListM[]>([]);;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imagesData,setImagesData]=useState<InitialImagesModel[]>([]);
    const [imagesData2,setImagesData2]=useState<FinalImagesModel[]>([]);
    const history = useHistory();
    const [cost,setCost]=useState<CostModel>({
      CD_COSTO:0,
      CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')||''
    })
    const userData= localStorage.getItem('UserData') ?? '';
    const decodedToken = jwtDecode<DecodedToken>(userData);
    let valueToken = decodedToken.idUsuario;
    
    const [present, dismiss] = useIonLoading();
  
    //STATUES
    const [statueChange,setStatueChange]=useState({
      CN_ID_ESTADOF:0,
      CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')
    });
  
    const [images, setImages] = useState<string[]>([]);
  
   
  
    const getStatues=async()=>{
      const data= await GetStatueService.fetchSupervisorStatues();
      setSatatues(data)
      console.log(statue)
    }
  
 
  
    const moveToList = () => {
      history.push("/SupervisorCloseList");
    };
    const backToMenu=()=>{
      history.push("/RolSelector")
  
    }
    const goToDetail=(id:string)=>{
      history.push("/TechIncidentDetail");
      localStorage.setItem('idIncident',id)
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
      } catch (error) {
        console.log(error)
      }
    }
  
    
  
    const getData= async()=>{
      try {
        const result = await getIncidentTechnicianDataList();
        setData(result);
        setError(null); 
      } catch (error) {
        console.error("Error al obtener incidencias:", error);
        setError("Error al obtener la incidencia");
      } finally {
        setLoading(false);
      }
    }
    
    const chargeImages=async()=>{
      const images= await InitialImagesService.fetchImages(0);
      const images2= await InitialImagesService.fetchImages(1);
      setImagesData(images);
      setImagesData2(images2);
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
    const presentToast = () => {
      presentT({
        message: 'Imagenes almacenadas!',
        duration: 3000,
        position: "top",
        color:"success"
      });
    };
    const sendDiagnosis= async()=>{
        try {
          const diagnosis=await DiagnosisIncidentListService.fetchDiagnosis();
          setDiagnosis(diagnosis);
          console.log(diagnosisData)
        } catch (error) {
          
        }
      }
  
      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCost((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        console.log(cost)
      };
 
      const presentToast2 = () => {
        presentT({
          message: 'Costo almacenado!',
          duration: 2000,
          position: "middle",
          color:"success"
        });
      };
      const sendCost=async()=>{
        try {
        
          await CostService.setCost(cost);
          console.log("Costo almacenado")
          present({
            message: "Almacenando costo...",
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
            presentToast2();
            setDetails();
            setCost((prevState) => ({
              ...prevState,
              CD_COSTO: 0,
            }));
            }, 1000); 
          });
        } catch (error) {
          console.log(error)
        }
      }
  
    return {
   
      moveToList,
      data,
      setData,
      setLoading,
      setError,
      loading,
      error,
      backToMenu,
      goToDetail,
      setDetails,
      formatDateTime,
      diagnosisData, 
       chargeImages,
      imagesData,
      getData,
      detail,
      statue,
      getStatues,
      handleStatue,
      imagesData2,
      sendDiagnosis,
      images,
      cost,
      handleInputChange,
      sendCost,
      valueToken
     
  
    };
  };
  
  export const getIncidentTechnicianDataList = async () => {
    try {
      const datos = await IncidentTechnicianListService.fetchIncidents();
      console.log("Datos extraidos");
      return datos;
    } catch (error) {
      console.log("Error en la extracción de datos");
      return [];
    }
  };
  