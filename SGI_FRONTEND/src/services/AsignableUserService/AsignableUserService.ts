import axios from "axios";
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
    static async techAsign(id:any, data:any) {
        try {
            const response = await axios.post(`http://localhost:3000/api/asignTech?CT_CEDULA_USUARIO_R=${id}&CT_CODIGO_INCIDENCIA_R=${localStorage.getItem('idIncident')}`,data);
            console.log("Asignacion completa")
        } catch (error) {
            throw new Error('Error al obtener los técnicos');
        }
    }

}