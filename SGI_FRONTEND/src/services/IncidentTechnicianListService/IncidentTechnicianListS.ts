import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";

export class IncidentTechnicianListService {
    static async fetchIncidents(): Promise<IncidentTechnicianListModel[]> {
        try {
            const response = await fetch('http://localhost:3000/api/gTechIncidents');
            const data: IncidentTechnicianListModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}