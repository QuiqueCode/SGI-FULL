import { jwtDecode } from "jwt-decode";

//FALTAN LOS ROLES
export interface DecodedToken {
    idUsuario:string
}

/*
const data = localStorage.getItem('UserData') ?? '';
const decodedToken = jwtDecode<DecodedToken>(data);
export let valueToken = decodedToken.idUsuario;*/