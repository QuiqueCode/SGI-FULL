import axios from "axios";
import { CreateDiagnosisModel } from "../../models/createDiagnosisModel/createDiagnosis.model";


export class CreateDiagnosisService {
    static async createDiagnosis(data: CreateDiagnosisModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cDiagnosis",
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al registrar el diagnostico");
        } else {
          throw new Error("Error desconocido durante la creación del diagnostico");
        }
      }
    }
  }
  

