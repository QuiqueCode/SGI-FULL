import { useState } from "react";
import { CreateDiagnosisService } from "../../services/CreateDiagnosisService/CDiagnosisService";
import { CreateDiagnosisModel } from "../../models/createDiagnosisModel/createDiagnosis.model";
import { DecodedToken } from "../../models/jwt/jwt.model";
import { jwtDecode } from "jwt-decode";


export function CDiagnosisMV(){
    const data = localStorage.getItem('UserData') ?? '';
    const decodedToken = jwtDecode<DecodedToken>(data);
    let valueToken = decodedToken.idUsuario;
    const [formData,setFormData]=useState({
        CT_ID_INCIDENCIA:'2024-000001',
        CN_TIEMPO_SOLUCION_ESTIMADO:0,
        CT_DIAGNOSTICO:'',
        CT_OBSERVACIONES:'',
        CT_TECNICO:valueToken
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        console.log(name,value);
        console.log(formData)
      };

      const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData)
        
        try {
            const diagnosis: CreateDiagnosisModel = formData;
            await CreateDiagnosisService.createDiagnosis(diagnosis);
            
        } catch (error) {
            console.error("Error creando incidencia:", error);
        }
    }

return{
    formData,
    handleInputChange,
    handleSubmit
}
}