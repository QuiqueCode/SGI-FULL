import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";

export class SupervisorIncidentCloseService {
    static async fetchIncidents(): Promise<IncidentListModel[]> {
        try {
            const response = await fetch('http://localhost:3000/api/gSupervisorIncident');
            const data: IncidentListModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}