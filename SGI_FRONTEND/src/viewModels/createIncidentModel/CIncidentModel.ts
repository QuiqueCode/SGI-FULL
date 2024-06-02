
import {Camera, CameraPermissionType, CameraResultType, CameraSource} from '@capacitor/camera'
import { useState } from 'react';
import { CIncidentModel } from '../../models/createIncidentModel/CIncident.model';
import { CreateIncidentService } from '../../services/CreateIncidentService/IncidentService';
import { useHistory } from 'react-router';
import { DecodedToken } from '../../models/jwt/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { useIonLoading } from '@ionic/react';


export function CIncidenciaViewModel(){
  const data = localStorage.getItem('UserData') ?? '';
const decodedToken = jwtDecode<DecodedToken>(data);
let valueToken = decodedToken.idUsuario;
const [present, dismiss] = useIonLoading();

    const [formData, setFormData] = useState({
        CT_TITULO_INCIDENCIA:'',
        CT_DESCRIPCION_INCIDENCIA:'',
        CT_LUGAR_DE_INCIDENCIA:'',
        CN_ID_ESTADOF:1,
        CT_CEDULA_USUARIO_CREADOR:valueToken,

      });
      const [images, setImages] = useState<string[]>([]);
      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        console.log(name,value);
        console.log(formData)
      };
      const history=useHistory();
    
      const openCamera = async () => {
        try {
          const response = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
          });
          
    
          if (response.webPath) {
            setImages((prevImages: string[]) => [...prevImages, response.webPath as string]);
            console.log(images)          }
        } catch (error) {
          console.error('Error taking photo', error);
        }
      };


    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData)
        
        try {
          const incident = formData;
          await CreateIncidentService.createIncident(incident);
      
          present({
            message: "Creando incidencia...",
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
              setFormData((prevState) => ({
                ...prevState,
                CT_TITULO_INCIDENCIA: '',
                CT_DESCRIPCION_INCIDENCIA: '',
                CT_LUGAR_DE_INCIDENCIA: '',
              }));
            }, 1000); // Asegura que esto ocurra después de la duración de la alerta
          });
        } catch (error) {
          console.error("Error creando la incidencia:", error);
          // Manejo de errores
        }
    }

    const cambiar=()=>{
        history.push('/login');
    }
    
return{
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    openCamera,
    setImages,
    images,
    cambiar
}
}