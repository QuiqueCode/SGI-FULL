import axios from "axios";
import { GetRolesModel } from "../../models/GetRolesModel/GetRolesModel";

export class GetRolesService {
    static async fetchRoles(): Promise<GetRolesModel[]> {
        try {
         
            const response = await fetch(`http://localhost:3000/api/gRoles`);
            const data: GetRolesModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los roles');
        }
    }
    static async suspendRole(data:any) {
        try {
         
            const response = await axios.post(`http://localhost:3000/api/suspendRole`,data);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los roles');
        }
    }
}