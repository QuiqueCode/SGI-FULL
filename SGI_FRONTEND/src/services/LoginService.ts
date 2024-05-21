import axios from "axios";
import { LoginModel } from "../assets/models/login.model";


export class LoginService {
    static async login(user: LoginModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          user
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.error || "Error logging in");
        } else {
          throw new Error("An unknown error occurred during login");
        }
      }
    }
  }
  

