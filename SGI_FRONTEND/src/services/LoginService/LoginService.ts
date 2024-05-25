import axios from "axios";
import { LoginModel } from "../../models/loginModel/login.model";


export class LoginService {
    
    static async login(user: LoginModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          user
        );
        localStorage.setItem('UserData',response.data.token)
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
  

