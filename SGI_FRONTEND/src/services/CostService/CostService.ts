import axios from "axios";
import { CostModel } from "../../models/CostModel/CostModel";



export class CostService {
    static async setCost(data: CostModel) {
      try {
        const response = await axios.patch(
          "http://localhost:3000/api/uCost",
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
  
