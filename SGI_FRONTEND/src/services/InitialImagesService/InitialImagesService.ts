import { InitialImagesModel } from "../../models/initialImages/InitialImages";

export class InitialImagesService {
    static async fetchImages(): Promise<InitialImagesModel[]> {
        try {
            const incidentId=localStorage.getItem("idIncident")
            const response = await fetch(`http://localhost:3000/api/imagesDetailIncident?CT_CODIGO_INCIDENCIA_R=${incidentId}`);
            const data: InitialImagesModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}