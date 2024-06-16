import { useHistory } from "react-router";
import { IncidentListService } from "../../services/IncidentListService/IncidentListService";
import { useState } from "react";
import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";
import { DiagnosisIncidentListService, IncidentTechnicianListService } from "../../services/IncidentTechnicianListService/IncidentTechnicianListS";
import { IncidentDiagnosisListM, IncidentTechnicianDetailM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";
import { IncidentTechnicianDetailService } from "../../services/GetTechnicianDiagnosisDetailService/IncidentTechnicianDetailService";
import { InitialImagesService } from "../../services/InitialImagesService/InitialImagesService";
import { FinalImagesModel, InitialImagesModel } from "../../models/initialImages/InitialImages";
import { StatuesModel } from "../../models/statuesModel/statuesmode";
import { GetStatueService } from "../../services/GetStatueService/getStatueService";
import { CreateIncidentService } from "../../services/CreateIncidentService/IncidentService";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { image } from "ionicons/icons";
import { useIonLoading, useIonToast } from "@ionic/react";
import { StatueModel } from "../../models/SetStatuesModel/SetSatuesModel";
import { SetStatueService } from "../../services/SetStatuesService/SetStatuesService";

export const IncidentTechnicalVM = () => {
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
  const [present, dismiss] = useIonLoading();

  //STATUES
  const [statueChange,setStatueChange]=useState({
    CN_ID_ESTADOF:0,
    CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')
  });

  const [images, setImages] = useState<string[]>([]);

  const openCamera = async () => {
    try {
      const response = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      if (response.webPath) {
        setImages((prevImages) => [...prevImages, response.webPath as string]);
        console.log(images);
 
      }
    } catch (error) {
      console.error('Error taking photo', error);
    }
  };



  const uploadImage = async () => {
    
    try {
      for (const imageUri of images) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg');

        const serverResponse = await CreateIncidentService.sendImages2(formData);
        console.log('Imagen subida con éxito:', serverResponse.data);
        
      }
      
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    }
  }


  const getStatues=async()=>{
    const data= await GetStatueService.fetchTechStatues();
    setSatatues(data)
    console.log(statue)
  }

  const moveToDiagnostic = () => {
    history.push("/diagnostic");
  };

  const moveToList = () => {
    history.push("/TechIncidentsList");
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

  

  const sendDiagnosis= async()=>{
    try {
      const diagnosis=await DiagnosisIncidentListService.fetchDiagnosis();
      setDiagnosis(diagnosis);
      console.log(diagnosisData)
    } catch (error) {
      
    }
  }

  const getData= async()=>{
    try {
      const result = await getIncidentTechnicianDataList();
      setData(result);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
      setError("Failed to fetch incidents");
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

  const saveImages=()=>{
    uploadImage();
          present({
            message: "Guardando imagenes...",
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
              chargeImages();
              presentToast();
              setImages([]);
            }, 1000); // Asegura que esto ocurra después de la duración de la alerta
          });
  }


  return {
    moveToDiagnostic,
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
    sendDiagnosis,
    diagnosisData, 
     chargeImages,
    imagesData,
    getData,
    detail,
    statue,
    getStatues,
    handleStatue,
    imagesData2,
    uploadImage,
    openCamera,
    images,
    saveImages
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
