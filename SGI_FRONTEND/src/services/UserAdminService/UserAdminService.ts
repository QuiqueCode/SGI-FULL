import axios from "axios";
import { UserAdminModel, UserSuspendModel } from "../../models/UserAdminModel/UserAdminModel";

export class UserAdminService {
    static async getUsers(): Promise<UserAdminModel[]> {
        try {
            const response = await fetch(`http://localhost:3000/api/getAllUsr`);
            const data: UserAdminModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
    static async suspendUser(user: UserSuspendModel) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/suspendUsr",
            user
          );
          
          return response.data;
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Error");
          } else {
            throw new Error("Error");
          }
        }
      }


}