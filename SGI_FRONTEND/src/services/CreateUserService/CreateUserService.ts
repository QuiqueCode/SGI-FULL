import axios from "axios";
import { CreateUserModel } from "../../models/CreateUserModel/CreateUserModel";

export class CreateUserService {
    static async createUser(data: CreateUserModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cUser",
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error al crear el usuario");
        } else {
          throw new Error("Error al crear el usuario");
        }
      }
    }
}