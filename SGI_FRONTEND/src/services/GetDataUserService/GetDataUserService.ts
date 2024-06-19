import { GetDataUserModel } from "../../models/GetDataUserModel/GetDataUserModel";

export class GetDataUserService {
    static async fetchUser(): Promise<GetDataUserModel> {
        try {
            const response = await fetch(`http://localhost:3000/api/gUser?CT_CEDULA=${localStorage.getItem('usrInfo')}`);
            const data: GetDataUserModel = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
}