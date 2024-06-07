import { jwtDecode } from "jwt-decode";
import { IncidentTechnicianListModel } from "../../models/incidentTechnicianListModel/IncidentTechnicianListM";
import { DecodedToken } from "../../models/jwt/jwt.model";
import { IncidentDiagnosisListM } from "../../models/IncidenTechnicianDetailModel/IncidentTechnicianDetailM";

export class IncidentTechnicianListService {
    static async fetchIncidents(): Promise<IncidentTechnicianListModel[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const decodedToken = jwtDecode<DecodedToken>(dataUser);
            let valueToken = decodedToken.idUsuario;
            const response = await fetch(`http://localhost:3000/api/gTechIncidents?CT_CEDULA_USUARIO_R=${valueToken}`);
            const data: IncidentTechnicianListModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}

export class DiagnosisIncidentListService {
    static async fetchDiagnosis(): Promise<IncidentDiagnosisListM[]> {
        try {
            const incidentId = localStorage.getItem('idIncident') ?? '';
            const response = await fetch(`http://localhost:3000/api/gDiagnosisLi?CT_CODIGO_INCIDENCIA_R=${incidentId}`);
            const data: IncidentDiagnosisListM[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}