
import {Camera, CameraPermissionType, CameraResultType, CameraSource} from '@capacitor/camera'
import { useState } from 'react';
import { CIncidentModel } from '../../models/createIncidentModel/CIncident.model';
import { CreateIncidentService } from '../../services/CreateIncidentService/IncidentService';
import { useHistory } from 'react-router';
import { DecodedToken } from '../../models/jwt/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { useIonLoading, useIonToast } from '@ionic/react';


export function CIncidenciaViewModel(){

  const [presentT] = useIonToast();
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
            setImages((prevImages) => [...prevImages, response.webPath as string]);
            console.log(images);
           // uploadImage(response.webPath);
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
            formData.append('file', blob, 'image.jpg'); // El nombre del campo debe ser 'file'
    
            const serverResponse = await CreateIncidentService.sendImages(formData);
            console.log('Imagen subida con éxito:', serverResponse.data);
          }
          
        } catch (error) {
          console.error('Error al subir las imágenes:', error);
        }
      }

      const presentToast = () => {
        presentT({
          message: 'Incidencia Almacenada!',
          duration: 3000,
          position: "top",
          color:"success"
        });
      };

      
      const presentToast2 = () => {
        presentT({
          message: 'No has añadido imagenes!',
          duration: 3000,
          position: "top",
          color:"danger"
        });
      };
    
    

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData)
        if (images.length!=0) {
          
      
        try {
          const incident = formData;
          await CreateIncidentService.createIncident(incident);
          uploadImage();
          
      
          present({
            message: "Creando incidencia...",
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
              presentToast();
              setImages([]);
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
      }else{
        presentToast2();
      }
    }

    const backToRolMenu=()=>{
        history.push('/RolSelector');
    }
    
return{
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    openCamera,
    setImages,
    images,
    backToRolMenu,
  
}
}