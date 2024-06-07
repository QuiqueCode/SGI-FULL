import axios from "axios";

export class IncidentTechnicianDetailService {
    static async viewTechnicianIncidentDetail(id:string) {
        try {
            const response = await axios.get(
                 `http://localhost:3000/api/gIncidentInfo?CT_CODIGO_INCIDENCIA=${id}`
               
            );

            return response.data; 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || "Error en la incidencia");
            } else {
                throw new Error("Ocurrió un error desconocido durante la incidencia");
            }
        }
    }
}