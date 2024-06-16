import axios from "axios";

export class WorkReportService {
    static async getWorkReport():Promise<WorkReportModel[]> {
        try {
            const response = await fetch('http://localhost:3000/api/gWorkR');
            const data: WorkReportModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}

