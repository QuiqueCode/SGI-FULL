import { AsignableUserModel } from "../../models/AsignableUsersModel/AsignableUserModel";

export class AsignableUserService {
    static async fetchUsers(): Promise<AsignableUserModel[]> {
        try {
            const response = await fetch(`http://localhost:3000/api/gAsignUsers?CT_CODIGO_INCIDENCIA=${localStorage.getItem('idIncident')}`);
            const data: AsignableUserModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los técnicos');
        }
    }
}