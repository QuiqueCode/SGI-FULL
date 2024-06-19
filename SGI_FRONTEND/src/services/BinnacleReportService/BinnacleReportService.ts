import { BinnacleReportM } from "../../models/BinnacleReportM/BinnacleReportM";

export class GetBinnacleReport {
    static async fetchBinacle(): Promise<BinnacleReportM[]> {
        try {
            const response = await fetch(`http://localhost:3000/api/gBinnacleR`);
            const data: BinnacleReportM[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
}