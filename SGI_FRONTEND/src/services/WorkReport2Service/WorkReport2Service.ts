import axios from "axios";
import { WorkReportModel2 } from "../../models/WorkReportModel2/WorkReportModel2";

export class WorkReportService2 {
    static async getWorkReport2():Promise<WorkReportModel2[]> {
        try {
            const response = await fetch('http://localhost:3000/api/gworkR2');
            const data: WorkReportModel2[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}

