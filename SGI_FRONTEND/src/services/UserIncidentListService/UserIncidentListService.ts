import { jwtDecode } from "jwt-decode";
import { UserIncidentListM } from "../../models/UserIncidentListModel/UserIncidentLIst";
import { IncidentListModel } from "../../models/incidentListModel/IncidentList.model";
import { DecodedToken } from "../../models/jwt/jwt.model";

export class UserIncidentListService {
    static async fetchIncidents(): Promise<UserIncidentListM[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const decodedToken = jwtDecode<DecodedToken>(dataUser);
            let valueToken = decodedToken.idUsuario;
            const response = await fetch(`http://localhost:3000/api/gIncidentU?CT_CEDULA_USUARIO_CREADOR=${valueToken}`);
            const data: UserIncidentListM[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener incidencias');
        }
    }
}