import { DepartamentModel } from "../../models/DepartamentModel/DepartamentModel";

export class GetDepartament {
    static async fetchDepartment(): Promise<DepartamentModel[]> {
        try {
  
            const response = await fetch(`http://localhost:3000/api/gDepartamentos`);
            const data: DepartamentModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener departamentos');
        }
    }
}