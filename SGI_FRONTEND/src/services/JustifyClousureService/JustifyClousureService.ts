import axios from "axios";
import { JustifyClousureModel } from "../../models/JustifyClousureModel/JustifyClousureModel";



export class CreateJustifyClousure {
    static async createJustifyClousure(data: JustifyClousureModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cJustify",
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al registrar la justificación");
        } else {
          throw new Error("Error al registrar la justificación");
        }
      }
    }
  }
  

