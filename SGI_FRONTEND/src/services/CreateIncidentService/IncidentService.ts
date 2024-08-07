import axios from "axios";
import { CIncidentModel } from "../../models/createIncidentModel/CIncident.model";


export class CreateIncidentService {
    static async createIncident(data: CIncidentModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cIncident",
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al crear la incidencia");
        } else {
          throw new Error("Error desconocido durante la creación de la incidencia");
        }
      }
    }

    static async sendImages(data: FormData) {
      try {
  
        const response = await axios.post(
          `http://localhost:3000/api/imagesCIncident`,
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al crear la incidencia");
        } else {
          throw new Error("Error desconocido durante la creación de la incidencia");
        }
      }
    }
    static async sendImages2(data: FormData) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/lastImagesCIncident?CT_CODIGO_INCIDENCIA_R=${localStorage.getItem('idIncident')}`,
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al crear la incidencia");
        } else {
          throw new Error("Error desconocido durante la creación de la incidencia");
        }
      }
    }
  }
  

