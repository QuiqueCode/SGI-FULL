
import {Camera, CameraPermissionType, CameraResultType, CameraSource} from '@capacitor/camera'
import { useState } from 'react';
import { CIncidentModel } from '../../models/createIncidentModel/CIncident.model';
import { CreateIncidentService } from '../../services/CreateIncidentService/IncidentService';
import { useHistory } from 'react-router';
import { DecodedToken } from '../../models/jwt/jwt.model';
import { jwtDecode } from 'jwt-decode';


export function CIncidenciaViewModel(){
  const data = localStorage.getItem('UserData') ?? '';
const decodedToken = jwtDecode<DecodedToken>(data);
let valueToken = decodedToken.idUsuario;

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
    
          // Verificar si response.webPath es un string antes de actualizar el estado
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
            const incident: CIncidentModel = formData;
            await CreateIncidentService.createIncident(incident);
            
        } catch (error) {
            console.error("Error creando incidencia:", error);
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