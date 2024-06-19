import axios from "axios";
import { CreateUserModel, EditUserModel } from "../../models/CreateUserModel/CreateUserModel";

export class editUserService {
    
    static async updateUser(user: EditUserModel) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/uUser?CT_CEDULA_REAL=${localStorage.getItem('usrInfo')}`,
          user
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al actualizar usuario");
        } else {
          throw new Error("Error de servidor");
        }
      }
    }
  }
  
