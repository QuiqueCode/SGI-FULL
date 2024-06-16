import axios from "axios";
import { SetAffectationModel, SetCategoryModel, SetRiskModel, StatueModel } from "../../models/SetStatuesModel/SetSatuesModel";

export class SetStatueService {
    
    static async setStatue(statue: StatueModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/uStatue",
          statue
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
    static async setRisk(risk: SetRiskModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/uRisk",
          risk
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
    static async setAffectation(affectation: SetAffectationModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/uAffectation",
          affectation
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
    static async setCategory(category: SetCategoryModel) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/uCategory",
          category
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
  

