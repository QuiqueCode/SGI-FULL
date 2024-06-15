import axios from "axios";
import { AffectationModel, CategoryModel, RiskModel, StatuesModel } from "../../models/statuesModel/statuesmode";

export class GetStatueService {
    static async fetchStatues(): Promise<StatuesModel[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const response = await fetch(`http://localhost:3000/api/gStatue`);
            const data: StatuesModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
    static async fetchRisk(): Promise<RiskModel[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const response = await fetch(`http://localhost:3000/api/gRisk`);
            const data: RiskModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
    static async fetchAffectation(): Promise<AffectationModel[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const response = await fetch(`http://localhost:3000/api/gAffectation`);
            const data: AffectationModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
    static async fetchCategory(): Promise<CategoryModel[]> {
        try {
            const dataUser = localStorage.getItem('UserData') ?? '';
            const response = await fetch(`http://localhost:3000/api/gCategory`);
            const data: CategoryModel[] = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error al obtener los estados');
        }
    }
}