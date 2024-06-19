export interface UserAdminModel{
    CT_CEDULA: string;
    CT_NOMBRE: string;
    CT_APELLIDO_UNO: string;
    CT_APELLIDO_DOS: string;
    CT_CORREO: string;
    CN_DEPARTAMENTO: number;
    CB_ESTADO: boolean;
    CT_PUESTO:string,
    DESCRIPCION_DEPARTAMENTO:string
}
export interface UserSuspendModel{
    CT_CEDULA:string,
    CB_ESTADO:boolean
}