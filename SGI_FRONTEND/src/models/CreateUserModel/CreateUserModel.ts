export interface CreateUserModel {
    CT_CEDULA: string;
    CT_NOMBRE: string;
    CT_APELLIDO_UNO: string;
    CT_APELLIDO_DOS: string;
    CN_TELEFONO: string;
    CT_CORREO: string;
    CT_PUESTO:string
    CN_DEPARTAMENTO: number;
    CB_ESTADO: boolean;
    CT_CONTRASENA: string;
    ROLES: number[];
  }
